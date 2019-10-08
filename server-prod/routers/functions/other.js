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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
exports.parseNumber = function (number) {
    return number ? parseInt(number) : undefined;
};
exports.uploadImage = multer_1.default({
    limits: {
        fileSize: 10000000 //10mb
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
            cb(new Error("Incorrect file extension."), false);
        }
        cb(undefined, true);
    }
});
exports.createRegexObj = function (query) { return ({
    $regex: new RegExp(query.trim().replace(/_/g, "|")),
    $options: "i"
}); };
exports.createQueryUsers = function (name) {
    return name
        ? {
            name: exports.createRegexObj(name)
        }
        : {};
};
exports.createQueryItems = function (query) {
    var priceFrom = query.priceFrom, priceTo = query.priceTo, name = query.name, owner = query.owner;
    var match = {
        price: {
            $gte: priceFrom ? parseInt(priceFrom) : 0,
            $lte: priceTo ? parseInt(priceTo) : 10000
        }
    };
    Object.keys(query).forEach(function (key) {
        if (key !== "priceFrom" &&
            key !== "priceTo" &&
            key !== "skip" &&
            key !== "limit" &&
            key !== "sortBy" &&
            key !== "order") {
            if (key === "name") {
                match = __assign(__assign({}, match), { $or: [
                        { itemModel: exports.createRegexObj(name) },
                        { brand: exports.createRegexObj(name) }
                    ] });
            }
            else if (key === "owner") {
                match.owner = owner;
            }
            else {
                match[key] = exports.createRegexObj(query[key]);
            }
        }
    });
    return match;
};
exports.onScrollLoadingSlice = function (skip, limit, array) {
    var skipInt = parseInt(skip);
    var limitInt = parseInt(limit);
    return array
        .reverse()
        .filter(function (e, i) { return i + 1 > skipInt && i + 1 <= limitInt + skipInt; });
};
//# sourceMappingURL=other.js.map