"use strict";
exports.__esModule = true;
var express = require('express');
var router = require('../../lib/router');
var db = require("./model");
function isProtected(req, res, next) {
    if (!req.session.userId) {
        return next(res.status(401).json({ redirect: '/login' }));
    }
    else
        return next();
}
router.get('/notes', isProtected, function (req, res) {
    db.getNotes(req, res);
});
router["delete"]('/notes/:id(\\d+)', isProtected, function (req, res) {
    db.deleteNote(req, res);
});
router.post('/notes', isProtected, function (req, res) {
    db.addNote(req, res);
});
router.put('/notes/:id(\\d+)', isProtected, function (req, res) {
    db.updateNote(req, res);
});
module.exports = router;
//# sourceMappingURL=routes.js.map