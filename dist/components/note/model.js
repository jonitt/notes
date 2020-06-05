"use strict";
exports.__esModule = true;
exports.deleteNote = exports.updateNote = exports.addNote = exports.getNotes = void 0;
var pool = require('../../lib/pool');
exports.getNotes = function (req, response) {
    var userId = req.session.userId;
    pool.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY id ASC', [userId], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).json({ notes: results.rows });
    });
};
exports.addNote = function (req, response) {
    var _a = req.body, note = _a.note, date = _a.date, info = _a.info;
    var userId = req.session.userId;
    pool.query("INSERT INTO notes (note, date, info, user_id) VALUES ($1, $2, $3, $4)", [note, date, info, userId], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(201).json(true);
    });
};
exports.updateNote = function (req, response) {
    var id = parseInt(req.params.id);
    var _a = req.body, note = _a.note, date = _a.date, info = _a.info;
    var userId = req.session.userId;
    pool.query('UPDATE notes SET note = $1, date = $2, info = $3, user_id = $4 WHERE id = $5', [note, date, info, userId, id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("Note edited, ID: " + id);
    });
};
exports.deleteNote = function (req, response) {
    var id = parseInt(req.params.id);
    pool.query('DELETE FROM notes WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("Note deleted, ID: " + id);
    });
};
//# sourceMappingURL=model.js.map