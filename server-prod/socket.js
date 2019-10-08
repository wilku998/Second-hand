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
var checkIfNotificationDoesntExist_1 = __importDefault(require("./functions/checkIfNotificationDoesntExist"));
var server_1 = require("./server");
var parseUser_1 = require("./routers/functions/parseUser");
var item_1 = __importDefault(require("./models/item"));
var parseNotifications_1 = __importDefault(require("./routers/functions/parseNotifications"));
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
var emitToUserTemplate = function (name, userToEmitID, data) {
    emitToUser(userToEmitID, function (socketsToEmit) {
        socketsToEmit.forEach(function (socketID) {
            io.to(socketID).emit(name, data);
        });
    });
};
var createAndEmitNotification = function (userToEmitID, kind, userID, secondPropertyForNotificationID, secondPropertyName) { return __awaiter(void 0, void 0, void 0, function () {
    var UserToEmit, _id, notification, parsedNotification, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(userToEmitID)];
            case 1:
                UserToEmit = _a.sent();
                if (!checkIfNotificationDoesntExist_1.default(UserToEmit.notifications, kind, userID, secondPropertyForNotificationID, secondPropertyName)) return [3 /*break*/, 6];
                _id = mongoose_1.Types.ObjectId();
                notification = {
                    _id: _id,
                    kind: kind,
                    user: userID,
                    addedAt: Date.now(),
                    isReaded: false
                };
                if (secondPropertyForNotificationID) {
                    notification[secondPropertyName] = secondPropertyForNotificationID;
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                UserToEmit.notifications = __spreadArrays(UserToEmit.notifications, [notification]);
                return [4 /*yield*/, UserToEmit.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, parseNotifications_1.default([notification])];
            case 4:
                parsedNotification = _a.sent();
                emitToUserTemplate("notification", userToEmitID, parsedNotification[0]);
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var emitNotificationForFollowedBy = function (userID, kind, propertyForNotificationID, propertyName, itemOwnerID) { return __awaiter(void 0, void 0, void 0, function () {
    var userToEmitFollowedBy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, parseUser_1.getFollowedBy(userID)];
            case 1:
                userToEmitFollowedBy = _a.sent();
                return [4 /*yield*/, Promise.all(userToEmitFollowedBy.map(function (e, i) { return __awaiter(void 0, void 0, void 0, function () {
                        var userToEmitID, emit;
                        return __generator(this, function (_a) {
                            userToEmitID = e._id.toString();
                            emit = function () {
                                return createAndEmitNotification(userToEmitID, kind, userID, propertyForNotificationID, propertyName);
                            };
                            switch (kind) {
                                case "followedUserFollows":
                                    if (userToEmitID !== propertyForNotificationID) {
                                        emit();
                                    }
                                    break;
                                case "followedUserLiked":
                                    if (userToEmitID !== itemOwnerID) {
                                        emit();
                                    }
                                    break;
                                default:
                                    emit();
                                    break;
                            }
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
    socket.on("sendNewItem", function (itemID) { return __awaiter(void 0, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, item_1.default.findById(itemID)];
                case 1:
                    item = _a.sent();
                    return [4 /*yield*/, emitNotificationForFollowedBy(item.owner.toString(), "followedUserAddedItem", itemID, "item")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("sendLikeItem", function (itemID, userWhoLikedID) { return __awaiter(void 0, void 0, void 0, function () {
        var item, ownerID;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, item_1.default.findById(itemID)];
                case 1:
                    item = _a.sent();
                    ownerID = item.owner.toString();
                    emitToUserTemplate("likeItem", ownerID, { itemID: itemID, userID: userWhoLikedID });
                    return [4 /*yield*/, createAndEmitNotification(ownerID, "ownItemLikedBySomeone", userWhoLikedID, itemID, "item")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, emitNotificationForFollowedBy(userWhoLikedID, "followedUserLiked", itemID, "item", ownerID)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("sendUnlikeItem", function (itemID, userWhoLikedID) { return __awaiter(void 0, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, item_1.default.findById(itemID)];
                case 1:
                    item = _a.sent();
                    emitToUserTemplate("unlikeItem", item.owner.toString(), {
                        itemID: itemID,
                        userID: userWhoLikedID
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("sendFollow", function (userWhoGotFollowID, userID) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitToUserTemplate("follow", userWhoGotFollowID, userID);
                    return [4 /*yield*/, createAndEmitNotification(userWhoGotFollowID, "follow", userID)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, emitNotificationForFollowedBy(userID, "followedUserFollows", userWhoGotFollowID, "userWhoGotFollow")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("sendUnfollow", function (userWhoGotFollowID, userID) {
        emitToUserTemplate("unfollow", userWhoGotFollowID, userID);
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
                            sendedAt: Date.now()
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