"use strict";
exports.__esModule = true;
var express = require('express');
var router = require('../../lib/router');
var db = require('./model');
router.post('/register', function (req, res) {
    db.validateRegister(req, res);
});
router.get('/login', function (req, res) {
    if (req.session.userId) {
        res.status(301).json({ redirect: '/notes' });
    }
    else
        res.status(200).json('Not logged in');
});
router.post('/logout', function (req, res) {
    req.session.destroy(function (err) { return console.log(err); });
    req.logout();
    res.status(301).json({ redirect: '/login' });
});
module.exports = router;
//# sourceMappingURL=routes.js.map