"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var messangerRoomSchema = new mongoose_1.Schema({
    roomName: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        default: [],
    },
    isReaded: {
        type: Boolean,
        default: false
    }
});
var MessangerRoom = mongoose_1.model("MessangerRoom", messangerRoomSchema);
exports.default = MessangerRoom;
//# sourceMappingURL=messangerRoom.js.map