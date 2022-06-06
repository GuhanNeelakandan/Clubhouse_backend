const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
    room: { type: String, required: true },
    createdby:{type:mongoose.Schema.Types.ObjectId}
    
}
    
);

module.exports = mongoose.model("Room", RoomSchema);