var Pool = require('pg').Pool;
var cred = require('./credentials/user');
module.exports = new Pool({
    user: cred.username,
    host: 'localhost',
    database: cred.database,
    password: cred.password,
    port: 5432
});
//# sourceMappingURL=pool.js.map