const express = require('express');
import { Request, Response, NextFunction } from 'express';
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const noteRoutes = require('./components/note/routes');
const cred = require('./lib/credentials/user');
const bodyParser = require("body-parser");
import { getNotes } from './components/note/model';

const server = express();
//const client = new Client();

const pool = new Pool({
  user: cred.username,
  host: 'localhost',
  database: cred.database,
  password: cred.password,
  port: 5432,
});

server.use(cors());
server.use(function(req: Request, res: Response, next: Function) {
  initiateHeader(res);
  next();
});
server.use(express.static(path.join(__dirname + '\\frontend')));
server.use(express.urlencoded());
server.use(express.json());
server.use(noteRoutes);

function initiateHeader(res: Response) {
  res.set({
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff'
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
