var _a = require('pg'), Pool = _a.Pool, Client = _a.Client;
var cred = require('./credentials/user');
module.exports = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=pool.js.map