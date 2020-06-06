const { Pool } = require('pg');
const cred = require('./credentials/user');
module.exports = new Pool({
  user: cred.username,
  host: process.env.DATABASE_URL,
  database: cred.database,
  password: cred.password,
  port: 5432,
});
