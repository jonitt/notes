var Pool = require('pg').Pool;
var cred = require('./credentials/user');
module.exports = new Pool({
    user: cred.username,
    host: process.env.DATABASE_URL,
    database: cred.database,
    password: cred.password,
    port: 5432
});
//# sourceMappingURL=pool.js.map