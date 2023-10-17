const mongoose = require('mongoose')

let message_priSchema = new mongoose.Schema({
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

let message_pri_collection = mongoose.model("Detail_message_pri", message_priSchema);
module.exports = message_pri_collection;