"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.addNote = exports.getNotes = void 0;
exports.getNotes = function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.session.userId;
                return [4 /*yield*/, req.app.get('db').connect()];
            case 1:
                client = _a.sent();
                client.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY id ASC', [userId], function (error, results) {
                    if (error) {
                        throw error;
                    }
                    response.status(200).json({ notes: results.rows });
                });
                client.release();
                return [2 /*return*/];
        }
    });
}); };
exports.addNote = function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, note, date, info, userId, client;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, note = _a.note, date = _a.date, info = _a.info;
                userId = req.session.userId;
                return [4 /*yield*/, req.app.get('db').connect()];
            case 1:
                client = _b.sent();
                client.query("INSERT INTO notes (note, date, info, user_id) VALUES ($1, $2, $3, $4)", [note, date, info, userId], function (error, results) {
                    if (error) {
                        throw error;
                    }
                    response.status(201).json(true);
                });
                client.release();
                return [2 /*return*/];
        }
    });
}); };
exports.updateNote = function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, note, date, info, userId, client;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = parseInt(req.params.id) //note's id
                ;
                _a = req.body, note = _a.note, date = _a.date, info = _a.info;
                userId = req.session.userId;
                return [4 /*yield*/, req.app.get('db').connect()];
            case 1:
                client = _b.sent();
                client.query('UPDATE notes SET note = $1, date = $2, info = $3, user_id = $4 WHERE id = $5', [note, date, info, userId, id], function (error, results) {
                    if (error) {
                        throw error;
                    }
                    response.status(200).send("Note edited, ID: " + id);
                });
                client.release();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteNote = function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, req.app.get('db').connect()];
            case 1:
                client = _a.sent();
                client.query('DELETE FROM notes WHERE id = $1', [id], function (error, results) {
                    if (error) {
                        throw error;
                    }
                    response.status(200).send("Note deleted, ID: " + id);
                });
                client.release();
                return [2 /*return*/];
        }
    });
}); };
