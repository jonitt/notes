const { Pool, Client } = require('pg');
const cred = require('./credentials/user');
module.exports = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
