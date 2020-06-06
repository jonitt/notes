"use strict";
exports.__esModule = true;
exports.validateLogin = exports.validateRegister = void 0;
var bcrypt = require('bcrypt');
var pool = require('../../lib/pool');
exports.validateRegister = function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password, passwordRepeat = _a.passwordRepeat;
    username = username ? username.trim() : username;
    if (!(username && password && passwordRepeat)) {
        res
            .status(400)
            .json({ error: true, message: 'Please fill all required fields' });
    }
    if (password.length < 8) {
        res.status(400).json({
            error: true,
            message: 'Password has to be at least 8 characters long'
        });
    }
    if (password !== passwordRepeat) {
        res.status(400).json({ error: true, message: 'Passwords do not match' });
    }
    console.log('jsut before query register');
    pool.query('SELECT * FROM users WHERE username = $1', [username], function (error, results) {
        console.log('after initiated query on register!');
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            res
                .status(400)
                .json({ error: true, message: 'Username already taken' });
        }
        else {
            bcrypt.hash(password, 12, function (err, hash) {
                pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hash], function (error, results) {
                    if (error) {
                        throw error;
                    }
                    res
                        .status(200)
                        .json({ error: false, message: 'Register success' });
                });
            });
        }
    });
};
exports.validateLogin = function (username, password, done) {
    pool.query('SELECT * FROM users WHERE username = $1', [username], function (error, results) {
        if (error) {
            throw error;
        }
        if (results.rows && results.rows.length > 0) {
            var user_1 = results.rows[0];
            bcrypt.compare(password, user_1.password, function (err, valid) {
                if (valid) {
                    done(null, user_1);
                }
                else {
                    done(null, false, { message: 'Wrong password' });
                }
            });
        }
        else {
            done(null, false, { message: 'Incorrect username' });
        }
    });
};
module.exports = { validateLogin: exports.validateLogin, validateRegister: exports.validateRegister };
//# sourceMappingURL=model.js.map