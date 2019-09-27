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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var mongoose_1 = require("mongoose");
var messangerRoom_1 = __importDefault(require("./models/messangerRoom"));
var createInterlocutor_1 = __importDefault(require("./functions/createInterlocutor"));
var user_1 = __importDefault(require("./models/user"));
var getMinifed_1 = require("./functions/getMinifed");
var checkIfNotificationsExist_1 = __importDefault(require("./functions/checkIfNotificationsExist"));
var server_1 = require("./server");
var parseUser_1 = require("./routers/functions/parseUser");
var io = socket_io_1.default(server_1.server);
var clients = [];
var findClients = function (userID) {
    return Object.keys(clients).filter(function (key) { return userID === clients[key].userID; });
};
var emitToUser = function (userID, callback) {
    var socketsToEmit = findClients(userID);
    if (socketsToEmit.length > 0) {
        callback(socketsToEmit);
    }
};
var emitToUserTemplate = function (name, userToEmit, data) {
    emitToUser(userToEmit, function (socketsToEmit) {
        socketsToEmit.forEach(function (socketID) {
            io.to(socketID).emit(name, data);
        });
    });
};
var createAndEmitNotification = function (user, kind, userForNotification, propertyForNotification, propertyName) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, notification, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = mongoose_1.Types.ObjectId();
                notification = {
                    _id: _id,
                    kind: kind,
                    user: userForNotification,
                    addedAt: Date.now(),
                    isReaded: false
                };
                if (propertyForNotification) {
                    notification[propertyName] = propertyForNotification;
                }
                if (!checkIfNotificationsExist_1.default(user.notifications, notification.kind, userForNotification, propertyForNotification, propertyName)) return [3 /*break*/, 4];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                user.notifications = __spreadArrays(user.notifications, [notification]);
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                emitToUserTemplate("notification", user._id.toString(), propertyForNotification
                    ? __assign(__assign({}, notification), (_a = {}, _a[propertyName] = propertyForNotification, _a)) : notification);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var emitNotificationForFollowedBy = function (kind, user, propertyForNotification, propertyName) { return __awaiter(void 0, void 0, void 0, function () {
    var userToEmitFollowedBy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, parseUser_1.getFollowedBy(user._id)];
            case 1:
                userToEmitFollowedBy = _a.sent();
                return [4 /*yield*/, Promise.all(userToEmitFollowedBy.map(function (e, i) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            createAndEmitNotification(e, kind, user, propertyForNotification, propertyName);
                            return [2 /*return*/];
                        });
                    }); }))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
////////////////////////////////////////////////////////////////////////////////////////////
io.on("connection", function (socket) {
    clients[socket.id] = { userID: "" };
    socket.on("setUserID", function (userID) {
        clients[socket.id].userID = userID;
    });
    socket.on("cleanUserID", function () {
        clients[socket.id] = { userID: "" };
    });
    socket.on("sendNewItem", function (user, itemID) { return __awaiter(void 0, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMinifed_1.getMinifedItem(itemID)];
                case 1:
                    item = _a.sent();
                    return [4 /*yield*/, emitNotificationForFollowedBy("followedUserAddedItem", user, item, "item")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("sendLikeItem", function (itemID, userToEmitID, user) { return __awaiter(void 0, void 0, void 0, function () {
        var item, userToEmit, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getMinifed_1.getMinifedItem(itemID)];
                case 1:
                    item = _b.sent();
                    return [4 /*yield*/, user_1.default.findById(userToEmitID)];
                case 2:
                    userToEmit = _b.sent();
                    userToEmit.populate("ownItems").execPopulate();
                    console.log(userToEmit.ownItems);
                    _a = createAndEmitNotification;
                    return [4 /*yield*/, user_1.default.findById(userToEmitID)];
                case 3: return [4 /*yield*/, _a.apply(void 0, [_b.sent(),
                        "ownItemLikedBySomeone",
                        user,
                        item,
                        "item"])];
                case 4:
                    _b.sent();
                    if (!(userToEmit.ownItems.findIndex(function (e) { return e._id.toString() === itemID; }) === -1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, emitNotificationForFollowedBy("followedUserLiked", user, item, "item")];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
    socket.on("sendUnlikeItem", function (itemID, userToEmit, user) {
        emitToUserTemplate("unlikeItem", userToEmit, { itemID: itemID, user: user });
    });
    socket.on("sendFollow", function (userToEmitID, userID) { return __awaiter(void 0, void 0, void 0, function () {
        var user, userWhoGotFollow, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    emitToUserTemplate("follow", userToEmitID, userID);
                    return [4 /*yield*/, getMinifed_1.getMinifedUser(userID)];
                case 1:
                    user = _b.sent();
                    return [4 /*yield*/, getMinifed_1.getMinifedUser(userToEmitID)];
                case 2:
                    userWhoGotFollow = _b.sent();
                    _a = createAndEmitNotification;
                    return [4 /*yield*/, user_1.default.findById(userToEmitID)];
                case 3: return [4 /*yield*/, _a.apply(void 0, [_b.sent(),
                        "follow",
                        user])];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, emitNotificationForFollowedBy("followedUserFollows", user, userWhoGotFollow, "userWhoGotFollow")];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("sendUnfollow", function (userToEmitID, userID) {
        emitToUserTemplate("unfollow", userToEmitID, userID);
    });
    socket.on("sendNewRoom", function (room, userID, interlocutorID) { return __awaiter(void 0, void 0, void 0, function () {
        var interlocutor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createInterlocutor_1.default(userID, room)];
                case 1:
                    interlocutor = _a.sent();
                    socket.emit("newInterlocutor", interlocutor);
                    emitToUser(interlocutorID, function (socketsToEmit) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            socketsToEmit.map(function (socketId) { return __awaiter(void 0, void 0, void 0, function () {
                                var interlocutor;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, createInterlocutor_1.default(interlocutorID, room)];
                                        case 1:
                                            interlocutor = _a.sent();
                                            io.to(socketId).emit("newInterlocutor", interlocutor);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("join", function (roomName) {
        socket.join(roomName);
    });
    socket.on("leave", function (roomName) {
        socket.leave(roomName);
    });
    socket.on("sendMessage", function (_a) {
        var message = _a.message, roomName = _a.roomName, senderID = _a.senderID;
        return __awaiter(void 0, void 0, void 0, function () {
            var room, messageObject;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, messangerRoom_1.default.findOne({ roomName: roomName })];
                    case 1:
                        room = _b.sent();
                        if (!room) return [3 /*break*/, 3];
                        messageObject = {
                            message: message,
                            senderID: senderID,
                            sendedAt: Date.now().toString()
                        };
                        room.messages = __spreadArrays(room.messages, [messageObject]);
                        room.isReaded = false;
                        return [4 /*yield*/, room.save()];
                    case 2:
                        _b.sent();
                        io.sockets.in(roomName).emit("message", messageObject, room.roomName);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    });
    socket.on("sendMessageReaded", function (roomName) { return __awaiter(void 0, void 0, void 0, function () {
        var room;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, messangerRoom_1.default.findOne({ roomName: roomName })];
                case 1:
                    room = _a.sent();
                    if (room) {
                        room.isReaded = true;
                        room.save();
                        io.sockets.in(roomName).emit("messageReaded", roomName);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("disconnect", function () {
        delete clients[socket.id];
    });
});
//# sourceMappingURL=socket.js.map