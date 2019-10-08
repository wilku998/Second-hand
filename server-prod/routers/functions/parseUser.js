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
var user_1 = __importDefault(require("../../models/user"));
var parseItems_1 = require("./parseItems");
var parseNotifications_1 = __importDefault(require("./parseNotifications"));
var other_1 = require("./other");
exports.parseFollowsAndLikes = function (items, property) {
    return items
        .filter(function (e) { return e[property]; })
        .map(function (e) {
        return e[property];
    });
};
var getIdOfFollowsAndLiked = function (items, property) {
    return items
        .filter(function (e) { return e[property]; })
        .map(function (e) {
        return e[property]._id;
    });
};
exports.getFollowedBy = function (userID) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, user_1.default.find({ "follows.user": userID })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.parseUser = function (user, notificationsDelete) { return __awaiter(void 0, void 0, void 0, function () {
    var followedBy, ownItems, parsedUser, unreadedNotificationsQuantity, _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, user.populate("ownItems").execPopulate()];
            case 1:
                _g.sent();
                return [4 /*yield*/, user.populate("follows.user").execPopulate()];
            case 2:
                _g.sent();
                return [4 /*yield*/, user.populate("likedItems.item").execPopulate()];
            case 3:
                _g.sent();
                return [4 /*yield*/, exports.getFollowedBy(user._id)];
            case 4:
                followedBy = _g.sent();
                return [4 /*yield*/, Promise.all(user.ownItems.map(function (item) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, parseItems_1.parseItem(item)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }))];
            case 5:
                ownItems = _g.sent();
                parsedUser = {
                    user: __assign(__assign({}, user.toJSON()), { follows: getIdOfFollowsAndLiked(user.follows, "user").reverse(), likedItems: getIdOfFollowsAndLiked(user.likedItems, "item").reverse(), followedBy: followedBy.map(function (e) { return e._id; }).reverse() }),
                    ownItems: ownItems.reverse()
                };
                delete parsedUser.followedByQuantity;
                if (!notificationsDelete) return [3 /*break*/, 6];
                delete parsedUser.user.notifications;
                return [2 /*return*/, parsedUser];
            case 6:
                unreadedNotificationsQuantity = user.notifications.filter(function (e) { return !e.isReaded; }).length;
                delete parsedUser.user.notifications;
                _a = [__assign({}, parsedUser)];
                _b = {};
                _c = [__assign({}, parsedUser.user)];
                _d = { unreadedNotificationsQuantity: unreadedNotificationsQuantity, notificationsQuantity: user.notifications.length };
                _e = other_1.onScrollLoadingSlice;
                _f = ["0",
                    "3"];
                return [4 /*yield*/, parseNotifications_1.default(user.notifications)];
            case 7: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_b.user = __assign.apply(void 0, _c.concat([(_d.notifications = _e.apply(void 0, _f.concat([_g.sent()])), _d)])), _b)]))];
        }
    });
}); };
exports.parseUsers = function (users) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Promise.all(users.map(function (user) { return exports.parseUser(user, true); }))];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
//# sourceMappingURL=parseUser.js.map