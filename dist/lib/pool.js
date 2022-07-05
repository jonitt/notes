var _a = require('pg'), Pool = _a.Pool, Client = _a.Client;
var cred = require('./credentials/user');
console.log('#######' + process.env.ENV);
module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
        rejectUnauthorized: process.env.ENV == 'prod'
    }
});
//# sourceMappingURL=pool.js.map