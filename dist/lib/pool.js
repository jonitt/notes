var _a = require('pg'), Pool = _a.Pool, Client = _a.Client;
var cred = require('./credentials/user');
var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();
module.exports = client;
//# sourceMappingURL=pool.js.map