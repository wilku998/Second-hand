"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    buffer: {
        type: Buffer,
        required: true
    }
});
var Image = mongoose_1.model("Image", schema);
exports.default = Image;
//# sourceMappingURL=image.js.map