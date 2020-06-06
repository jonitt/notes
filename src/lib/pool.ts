const { Pool, Client } = require('pg');
const cred = require('./credentials/user');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = client;

