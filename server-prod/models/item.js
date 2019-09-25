"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var itemSchema = new mongoose_1.Schema({
    itemModel: {
        type: String,
        trim: true,
    },
    brand: {
        type: String,
        trim: true,
    },
    size: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    owner: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "User"
    },
}, { timestamps: true });
var Item = mongoose_1.model("Item", itemSchema);
exports.default = Item;
//# sourceMappingURL=item.js.map