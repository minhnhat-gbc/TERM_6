const mongoose = require('mongoose')

let messageSchema = new mongoose.Schema({
    From_user: {
        type: String,
    },
    Room: {
        type: String,
    },
    Message_detail: {
        type: String,
        require: true,
        lowercase: true
    },
    Create_Date: {
        type: Date,
        default: Date.now
    }
})

let message_group_collection = mongoose.model("Detail_message_gro", messageSchema);
module.exports = userCollection;