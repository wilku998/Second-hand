"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : "mongodb://127.0.0.1:27017/second-hand", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
//# sourceMappingURL=mongoose.js.map