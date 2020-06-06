const express = require('express');
import { Request, Response, NextFunction } from 'express';
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const secret = require('./lib/credentials/secret');
const noteRoutes = require('./components/note/routes');
const authRoutes = require('./components/auth/routes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('./lib/router');
const authDb = require('./components/auth/model');

const server = express();
const client = redis.createClient(process.env.REDIS_URL);
console.log(process.env.REDIS_URL, ' s what');
console.log(process.env.DATABASE_URL);
server.use(
  cors({
    origin: true, ///localhost:9000\/.*$/,
    credentials: true,
  })
);
server.use(bodyParser());

server.use((req: Request, res: Response, next: Function) => {
  initiateHeader(res);
  next();
});
server.use(express.static(path.join(__dirname + '/frontend')));
server.use(express.urlencoded());
server.use(express.json());
server.use(
  session({
    secret,
    resave: true,
    saveUninitialized: false,
    store: new redisStore({ client }),
    cookie: {
      secure: true,
      httpOnly: true,
    },
  })
);

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function(user: any, done: any) {
  done(null, user.id);
});
passport.deserializeUser(function(id: any, done: any) {});
passport.use(
  new LocalStrategy(function(
    username: String,
    password: String,
    done: Function
  ) {
    username = username.trim();
    if (username && password) {
      authDb.validateLogin(username, password, done);
    } else {
      done(null, false, { message: 'Invalid username or password' });
    }
  })
);

router.post('/login', function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate('local', function(err: Error, user: any, info: Object) {
    if (err) {
      console.log('what is err', err);
    }
    if (!user) {
      return res.status(401).json({ error: true, ...info });
    }
    req.session.userId = user.id;
    return res.redirect('/notes');
  })(req, res, next);
});

server.use(noteRoutes);
server.use(authRoutes);

function initiateHeader(res: Response) {
  res.set({
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
  });
  return res;
}
const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log(`Listening on ${port}!`);
});
