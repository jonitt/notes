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
const bcrypt = require('bcrypt');
const pool = require('./lib/pool');
const router = require('./lib/router');

const server = express();
const client = redis.createClient();

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
server.use(express.static(path.join(__dirname + '\\frontend')));
server.use(express.urlencoded());
server.use(express.json());
server.use(
  session({
    secret,
    resave: true,
    saveUninitialized: false,
    store: new redisStore({
      host: 'localhost',
      port: 6379,
      client: client,
      ttl: 260,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);
/*
server.use((req: Request, res: Response, next: NextFunction) =>
  checkLoggedin(req, res, next)
);*/

server.use (function (req: Request, res: Response, next:Function) {
  console.log ("inside middleware");
  next();
});

server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser(function(user: any, done: any) {
  // This happens at the end of a request, it recieves the
  // req.user object, and you can then choose what to serialise
  // into the session (returning the user a new cookie with a
  // session ID).
  // In most cases you'll want to store as little data as possible
  // so just a user.id might be fine.
  console.log('seriralralliesalreias user ', user);
  done(null, user.id);
});

passport.deserializeUser(function(id: any, done: any) {
  // Assume we stored the user ID in the session in the above
  // function call, we can now access it.
  // You can now take "id" and pass it into your database and
  // get back whatever you want in regards to the user. This may
  // just be a small representation of the user, or the entire
  // record.
  // You can use either SQL or an ORM here. The important bit is
  // that you call the "done" callback with whatever object you
  // want to represent the user.
  /*User.findById(id, function(err, user) {
    // In your main request handlers, you will then call `req.user`
    // and get back whatever you passed into the callback.
    done(err, user);
  });*/
  console.log('deseararawer ueser id', id);
});
passport.use(
  new LocalStrategy(function(
    username: String,
    password: String,
    done: Function
  ) {
    console.log('this shrrt owrking or not', username, password);
    // Run your SQL here to find the user by their username
    // Then check their password is correct
    // If something fails then call the "done" callback with a descriptive error
    // otherwise call "done" with no error, and pass it the "user" object. This will
    // be assigned to req.user which will then later be put through our serialize
    // function above.
    // In this case I'm using an ORM, but you can use something to execute raw SQL
    // if you like.
    username = username.trim();
    if (username && password) {
      pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username],
        (error: Error, results: any) => {
          if (error) {
            throw error;
          }
          if (results.rows && results.rows.length > 0) {
            const user = results.rows[0];
            bcrypt.compare(
              password,
              user.password,
              (err: Error, valid: any) => {
                if (valid) {
                  //req.session.loggedin = true;
                  //req.session.userId = user.id;
                  done(null, user);
                } else {
                  done(null, false, { message: 'Wrong password' });
                }
                //res.status(200).json({ success: true });
              }
            );
          } else {
            done(null, false, { message: 'Incorrect username' });
          }

          //return results;
        }
      );
    } else {
      done(null, false, { message: 'Invalid username or password' });
    }
    /*
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    // This is a made up function here, you'll need to create this and fill it out
    // if you're using SQL you will probably have a function called "validPassword"
    // (not assigned to a user object) where you will then pass in the hashed password
    // from your database, and the password they provided you (the password string in this
    // case).
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    // We have a user and the passwords match so we can return the user object!
    return done(null, user);
  }*/
  })
);

// Now we need to mount our configured strategy to an endpoint
router.post('/login', function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate('local', function(
    err: Error,
    user: Object,
    info: Object
  ) {
    console.log('What is session , baby dont hurt me,', req.session);
    if (err) {
      console.log('what is err', err);
      //return next(err);
    }
    if (!user) {
      //return res.redirect('/login');
      return res.status(401).json({ error: true, ...info });
    }
    /*
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/users/' + user.username);
    });*/
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

server.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
