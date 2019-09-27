"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var user_1 = __importDefault(require("../models/user"));
var auth_1 = __importDefault(require("../middlwares/auth"));
var findUser_1 = __importDefault(require("../middlwares/findUser"));
var item_1 = __importDefault(require("../models/item"));
var parseUser_1 = require("./functions/parseUser");
var other_1 = require("./functions/other");
var router = express_1.default.Router();
router.post("/api/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, parsedUser, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                user = new user_1.default(__assign({}, req.body));
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                return [4 /*yield*/, user.generateAuthToken()];
            case 2:
                token = _a.sent();
                res.cookie("jwtToken", token, { maxAge: 108000000, httpOnly: true });
                return [4 /*yield*/, parseUser_1.parseUser(user)];
            case 3:
                parsedUser = _a.sent();
                res.status(201).send(parsedUser);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                res.status(400).send(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post("/api/users/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, token, parsedUser, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.default.findByCredenctials(email, password)];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, user.generateAuthToken()];
            case 2:
                token = _b.sent();
                res.cookie("jwtToken", token, { maxAge: 108000000, httpOnly: true });
                return [4 /*yield*/, parseUser_1.parseUser(user)];
            case 3:
                parsedUser = _b.sent();
                res.send(parsedUser);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _b.sent();
                res.status(400).send(e_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/api/users/me", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, parsedUser, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                return [4 /*yield*/, parseUser_1.parseUser(user)];
            case 1:
                parsedUser = _a.sent();
                res.send(parsedUser);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(500).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/api/users/logout", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token_1, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user, token_1 = req.token;
                user.tokens = user.tokens.filter(function (t) { return t.token !== token_1; });
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                res.send();
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(500).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/users/me/avatar", auth_1.default, other_1.uploadImage.single("avatar"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sharp_1.default(req.file.buffer)
                    .png()
                    .resize(250)
                    .toBuffer()];
            case 1:
                buffer = _a.sent();
                // req.user.avatar = buffer;
                return [4 /*yield*/, req.user.save()];
            case 2:
                // req.user.avatar = buffer;
                _a.sent();
                res.send();
                return [2 /*return*/];
        }
    });
}); }, function (error, req, res, next) {
    res.status(400).send({ error: error.message });
});
router.patch("/api/users/me", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_2, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_2 = req.user;
                Object.keys(req.body).forEach(function (key) {
                    user_2[key] = req.body[key];
                });
                return [4 /*yield*/, user_2.save()];
            case 1:
                _a.sent();
                res.send();
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(400).send(e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.patch("/api/users/me/likes", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, likedID, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                likedID = req.body.likedID;
                user.likedItems.push({ item: likedID });
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                res.send();
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.status(400).send(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete("/api/users/me/likes", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, likedID_1, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                likedID_1 = req.body.likedID;
                user.likedItems = user.likedItems.filter(function (e) {
                    return e.item.toString() !== likedID_1;
                });
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                res.send();
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                res.status(400).send(e_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.patch("/api/users/me/follows", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userID, followedUser, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                user = req.user;
                userID = req.body.userID;
                return [4 /*yield*/, user_1.default.findById(userID)];
            case 1:
                followedUser = _a.sent();
                if (!followedUser) {
                    throw new Error();
                }
                followedUser.followedByQuantity++;
                return [4 /*yield*/, followedUser.save()];
            case 2:
                _a.sent();
                user.follows.push({ user: userID });
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                res.send();
                return [3 /*break*/, 5];
            case 4:
                e_8 = _a.sent();
                res.status(400).send(e_8);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.delete("/api/users/me/follows", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userID_1, followedUser, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                user = req.user;
                userID_1 = req.body.userID;
                return [4 /*yield*/, user_1.default.findById(userID_1)];
            case 1:
                followedUser = _a.sent();
                if (!followedUser) {
                    throw new Error();
                }
                followedUser.followedByQuantity--;
                return [4 /*yield*/, followedUser.save()];
            case 2:
                _a.sent();
                user.follows = user.follows.filter(function (e) {
                    return e.user.toString() !== userID_1;
                });
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                res.send();
                return [3 /*break*/, 5];
            case 4:
                e_9 = _a.sent();
                res.status(404).send(e_9);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/api/users/count", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, count, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = other_1.createQueryUsers(req.query.name);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.countDocuments(query)];
            case 2:
                count = _a.sent();
                res.send({ count: count });
                return [3 /*break*/, 4];
            case 3:
                e_10 = _a.sent();
                res.status(500).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/api/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, skip, limit, order, sortBy, query, foundedUsers, users, e_11;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, name = _a.name, skip = _a.skip, limit = _a.limit, order = _a.order, sortBy = _a.sortBy;
                query = other_1.createQueryUsers(name);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.find(query)
                        .sort((_b = {}, _b[sortBy ? sortBy : "_id"] = other_1.parseNumber(order), _b))
                        .skip(other_1.parseNumber(skip))
                        .limit(other_1.parseNumber(limit))];
            case 2:
                foundedUsers = _c.sent();
                return [4 /*yield*/, parseUser_1.parseUsers(foundedUsers)];
            case 3:
                users = _c.sent();
                res.send(users);
                return [3 /*break*/, 5];
            case 4:
                e_11 = _c.sent();
                res.status(404).send();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/api/users/:id", findUser_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, parsedUser, e_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                return [4 /*yield*/, parseUser_1.parseUser(user, true)];
            case 1:
                parsedUser = _a.sent();
                res.send(parsedUser);
                return [3 /*break*/, 3];
            case 2:
                e_12 = _a.sent();
                res.status(400).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete("/api/users/me", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var password, user, isMatch, e_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                password = req.body.password;
                user = req.user;
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 1:
                isMatch = _a.sent();
                if (!isMatch) {
                    throw new Error();
                }
                return [4 /*yield*/, item_1.default.deleteMany({ owner: user._id })];
            case 2:
                _a.sent();
                return [4 /*yield*/, user_1.default.findOneAndDelete({ _id: req.user._id })];
            case 3:
                _a.sent();
                res.send();
                return [3 /*break*/, 5];
            case 4:
                e_13 = _a.sent();
                res.status(400).send({ message: "Podane hasło jest nieprawidłowe." });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/api/users/followsAndLikes/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, follows, likedItems, followedBy, _a, _b, _c, e_14;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                return [4 /*yield*/, user_1.default.findById(req.params.id)];
            case 1:
                user = _d.sent();
                if (!user) {
                    throw new Error();
                }
                return [4 /*yield*/, user.populate("follows.user").execPopulate()];
            case 2:
                _d.sent();
                return [4 /*yield*/, user.populate("likedItems.item").execPopulate()];
            case 3:
                _d.sent();
                follows = user.follows, likedItems = user.likedItems;
                return [4 /*yield*/, parseUser_1.getFollowedBy(user._id)];
            case 4:
                followedBy = _d.sent();
                _b = (_a = res).send;
                _c = {
                    likedItems: parseUser_1.parseFollowsAndLikes(likedItems, "item")
                };
                return [4 /*yield*/, parseUser_1.parseUsers(parseUser_1.parseFollowsAndLikes(follows, "user"))];
            case 5:
                _c.follows = _d.sent();
                return [4 /*yield*/, parseUser_1.parseUsers(followedBy)];
            case 6:
                _b.apply(_a, [(_c.followedBy = _d.sent(),
                        _c)]);
                return [3 /*break*/, 8];
            case 7:
                e_14 = _d.sent();
                res.status(404).send();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.patch("/api/users/me/readNotification", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var notificationID_1, user, e_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                notificationID_1 = req.body.id;
                user = req.user;
                user.notifications.forEach(function (e) {
                    if (e._id.toString() === notificationID_1) {
                        e.isReaded = true;
                    }
                });
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                res.send();
                return [3 /*break*/, 3];
            case 2:
                e_15 = _a.sent();
                res.status(500).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=users.js.map