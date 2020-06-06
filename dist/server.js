"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var secret = require('./lib/credentials/secret');
var noteRoutes = require('./components/note/routes');
var authRoutes = require('./components/auth/routes');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = require('./lib/router');
var authDb = require('./components/auth/model');
var server = express();
var client = redis.createClient(process.env.REDIS_URL);
console.log(process.env.REDIS_URL, ' s what');
console.log(process.env.DATABASE_URL);
server.use(cors({
    origin: true,
    credentials: true
}));
server.use(bodyParser());
server.use(function (req, res, next) {
    initiateHeader(res);
    next();
});
server.use(express.static(path.join(__dirname + '/frontend')));
server.use(express.urlencoded());
server.use(express.json());
server.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: false,
    store: new redisStore({ client: client }),
    cookie: {
        secure: true,
        httpOnly: true
    }
}));
server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) { });
passport.use(new LocalStrategy(function (username, password, done) {
    username = username.trim();
    if (username && password) {
        authDb.validateLogin(username, password, done);
    }
    else {
        done(null, false, { message: 'Invalid username or password' });
    }
}));
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log('what is err', err);
        }
        if (!user) {
            return res.status(401).json(__assign({ error: true }, info));
        }
        req.session.userId = user.id;
        return res.redirect('/notes');
    })(req, res, next);
});
server.use(noteRoutes);
server.use(authRoutes);
function initiateHeader(res) {
    res.set({
        'X-XSS-Protection': '1; mode=block',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff'
    });
    return res;
}
var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Listening on " + port + "!");
});
//# sourceMappingURL=server.js.map