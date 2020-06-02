const express = require('express');
import { Request, Response, NextFunction } from 'express';
const path = require('path');
const cors = require('cors');
const noteRoutes = require('./components/note/routes');
const authRoutes = require('./components/auth/routes');
const bodyParser = require('body-parser');
const session = require('express-session');
import { getNotes } from './components/note/model';
const cookie = require('./lib/credentials/cookie');

const server = express();

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
    secret: cookie.secret,
    resave: true,
    saveUninitialized: true,
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
/*
pool.connect();

pool.query(
  'SELECT $1::text as message',
  ['Hello world!'],
  (err: Error, res: any) => {
    console.log(err ? err.stack : res.rows[0].message); // Hello World!
    //client.end();
  }
);
server.get('/', function(req: Request, res: Response) {
  res.send('Hello World!');
});
*/
server.listen(3000, function() {
  console.log('Example server listening on port 3000!');
});
