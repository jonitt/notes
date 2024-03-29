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
exports.validateLogin = exports.validateRegister = void 0;
var bcrypt = require('bcrypt');
exports.validateRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, passwordRepeat, client, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, passwordRepeat = _a.passwordRepeat;
                username = username ? username.trim() : username;
                if (!(username && password && passwordRepeat)) {
                    res
                        .status(400)
                        .json({ error: true, message: 'Please fill all required fields' });
                }
                if (password.length < 8) {
                    res.status(400).json({
                        error: true,
                        message: 'Password has to be at least 8 characters long',
                    });
                }
                if (password !== passwordRepeat) {
                    res.status(400).json({ error: true, message: 'Passwords do not match' });
                }
                return [4 /*yield*/, req.app.get('db').connect()];
            case 1:
                client = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, client.query('SELECT * FROM users WHERE username = $1', [username], function (error, results) {
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
                                client.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hash], function (error, results) {
                                    if (error) {
                                        throw error;
                                    }
                                    res
                                        .status(200)
                                        .json({ error: false, message: 'Register success' });
                                });
                            });
                        }
                    })];
            case 3:
                _b.sent();
                client.release();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _b.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.validateLogin = function (username, password, done, db) { return __awaiter(void 0, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.connect()];
            case 1:
                client = _a.sent();
                client.query('SELECT * FROM users WHERE username = $1', [username], function (error, results) {
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
                client.release();
                return [2 /*return*/];
        }
    });
}); };
module.exports = { validateLogin: exports.validateLogin, validateRegister: exports.validateRegister };
