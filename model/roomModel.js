const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
    room: { type: String, required: true },
    
}
    
);

module.exports = mongoose.model("Room", RoomSchema);