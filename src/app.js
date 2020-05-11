var express = require('express');
var app = express();
const { Client } = require('pg');
const client = new Client();
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(function (req, res, next) {
  initiateHeader(res);
  next();
});
app.use(express.static(path.join(__dirname + '/dist/')));

function initiateHeader(res) {
  res.set({
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
  });
  return res;
}

client.connect();
client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message); // Hello World!
  client.end();
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
