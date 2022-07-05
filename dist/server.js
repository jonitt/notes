"use strict";
exports.__esModule = true;
require('dotenv').config();
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
var authDb = require('./components/auth/model');
var Pool = require('pg').Pool;
var server = express();
var client = redis.createClient(process.env.REDIS_URL);
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
        httpOnly: true
    }
}));
var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 20000
});
server.set('db', pool);
server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) { });
passport.use(new LocalStrategy(function (username, password, done) {
    username = username.trim();
    if (username && password) {
        authDb.validateLogin(username, password, done, server.get('db'));
    }
    else {
        done(null, false, { message: 'Invalid username or password' });
    }
}));
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