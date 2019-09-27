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
var item_1 = __importDefault(require("../models/item"));
var auth_1 = __importDefault(require("../middlwares/auth"));
var parseItems_1 = require("./functions/parseItems");
var other_1 = require("./functions/other");
var router = express_1.default.Router();
router.post("/api/items", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item, _a, _b, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                item = new item_1.default(__assign(__assign({}, req.body), { owner: req.user._id, price: parseInt(req.body.price) }));
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, item.save()];
            case 2:
                _c.sent();
                _b = (_a = res.status(201)).send;
                return [4 /*yield*/, parseItems_1.parseItem(item)];
            case 3:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _c.sent();
                res.status(400).send(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/api/items/count", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, count, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = other_1.createQueryItems(req.query);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, item_1.default.countDocuments(query)];
            case 2:
                count = _a.sent();
                res.send({ count: count });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.status(500).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/api/items", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, skip, limit, order, sortBy, query, items, parsedItems, e_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, skip = _a.skip, limit = _a.limit, order = _a.order, sortBy = _a.sortBy;
                query = other_1.createQueryItems(req.query);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, item_1.default.find(query)
                        .sort((_b = {}, _b[sortBy] = other_1.parseNumber(order), _b))
                        .skip(other_1.parseNumber(skip))
                        .limit(other_1.parseNumber(limit))];
            case 2:
                items = _c.sent();
                return [4 /*yield*/, Promise.all(items.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, parseItems_1.parseItem(item)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }))];
            case 3:
                parsedItems = _c.sent();
                res.send(parsedItems);
                return [3 /*break*/, 5];
            case 4:
                e_3 = _c.sent();
                res.status(404).send();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get("/api/items/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item, _a, _b, e_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, item_1.default.findById(req.params.id)];
            case 1:
                item = _c.sent();
                if (!item) {
                    throw new Error("Unable to find item!");
                }
                _b = (_a = res).send;
                return [4 /*yield*/, parseItems_1.parseItem(item)];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _c.sent();
                res.status(404).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.patch("/api/items/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedItem, _a, _b, e_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, item_1.default.findByIdAndUpdate(req.params.id, req.body.update)];
            case 1:
                updatedItem = _c.sent();
                _b = (_a = res).send;
                return [4 /*yield*/, parseItems_1.parseItem(updatedItem)];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _c.sent();
                res.status(404).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete("/api/items/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, item_1.default.findByIdAndRemove(id)];
            case 1:
                _a.sent();
                res.send();
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.status(400).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=items.js.map