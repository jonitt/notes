const { Pool } = require('pg');
const cred = require('./credentials/user');
module.exports = new Pool({
  user: cred.username,
  host: 'localhost',
  database: cred.database,
  password: cred.password,
  port: 5432,
});
