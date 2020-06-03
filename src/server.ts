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

const server = express();
const client = redis.createClient();

server.use(cors());

server.use(function(req: Request, res: Response, next: Function) {
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
    saveUninitialized: true,
    store: new redisStore({
      host: 'localhost',
      port: 6379,
      client: client,
      ttl: 260,
    }),
  })
);

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
