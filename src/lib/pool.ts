const { Pool, Client } = require('pg');
const cred = require('./credentials/user');
module.exports = new Client({
  user: cred.username,
  host: process.env.DATABASE_URL,
  database: cred.database,
  password: cred.password,
  port: 5432,
});
