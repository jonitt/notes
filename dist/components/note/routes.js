"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("./model");
var router = require('../router');
router.get('/notes', function (req, res) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
});
function isProtected(req, res, next) {
    if (!req.session.userId) {
        return next(res.status(401).json({ redirect: '/login' }));
    }
    else
        return next();
}
router.get('/api/v1/notes', isProtected, function (req, res) {
    db.getNotes(req, res);
});
router.delete('/api/v1/notes/:id(\\d+)', isProtected, function (req, res) {
    db.deleteNote(req, res);
});
router.post('/api/v1/notes', isProtected, function (req, res) {
    db.addNote(req, res);
});
router.put('/api/v1/notes/:id(\\d+)', isProtected, function (req, res) {
    db.updateNote(req, res);
});
module.exports = router;
