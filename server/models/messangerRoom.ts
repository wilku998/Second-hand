import { Schema, model } from "mongoose";
import { IMessangerRoomModel, IMessangerRoom } from "./interfaces";

const messangerRoomSchema = new Schema({
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

const MessangerRoom: IMessangerRoomModel = model<IMessangerRoom, IMessangerRoomModel>("MessangerRoom", messangerRoomSchema);

export default MessangerRoom;