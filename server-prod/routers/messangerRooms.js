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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../middlwares/auth"));
var messangerRoom_1 = __importDefault(require("../models/messangerRoom"));
var createInterlocutor_1 = __importDefault(require("../functions/createInterlocutor"));
var user_1 = __importDefault(require("../models/user"));
var other_1 = require("./functions/other");
var router = express_1.default.Router();
router.get("/api/messangerRooms/interlocutors", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userIDString_1, messangerRooms, interlocutors, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userIDString_1 = req.user._id.toString();
                return [4 /*yield*/, messangerRoom_1.default.find({
                        roomName: other_1.createRegexObj(userIDString_1)
                    })];
            case 1:
                messangerRooms = _a.sent();
                return [4 /*yield*/, Promise.all(messangerRooms.map(function (room) { return __awaiter(void 0, void 0, void 0, function () {
                        var interlocutor;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, createInterlocutor_1.default(userIDString_1, room)];
                                case 1:
                                    interlocutor = _a.sent();
                                    return [2 /*return*/, interlocutor];
                            }
                        });
                    }); }))];
            case 2:
                interlocutors = _a.sent();
                res.send(interlocutors.filter(function (e) { return e.interlocutor; }).reverse());
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/api/messangerRooms", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var interlocutorID, userIDString, interlocutor, room, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                interlocutorID = req.body.interlocutorID;
                userIDString = req.user._id.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.findById(interlocutorID)];
            case 2:
                interlocutor = _a.sent();
                if (!interlocutor) {
                    throw new Error();
                }
                room = new messangerRoom_1.default({
                    roomName: userIDString + "-" + interlocutorID
                });
                return [4 /*yield*/, room.save()];
            case 3:
                _a.sent();
                res.status(201).send(room);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                res.status(404).send();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/api/messangerRooms/messages/:roomName", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, limit_1, skip_1, room, messages, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, limit_1 = _a.limit, skip_1 = _a.skip;
                limit_1 = parseInt(limit_1);
                skip_1 = parseInt(skip_1);
                return [4 /*yield*/, messangerRoom_1.default.findOne({
                        roomName: req.params.roomName
                    }).select("messages")];
            case 1:
                room = _b.sent();
                messages = room.messages
                    .reverse()
                    .filter(function (e, i) { return i + 1 > skip_1 && i + 1 <= limit_1 + skip_1; }).reverse();
                res.send({ messages: messages });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _b.sent();
                res.status(404).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=messangerRooms.js.map