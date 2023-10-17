const mongoose = require('mongoose')

let accountSchema = new mongoose.Schema({
    First_Name: {
        type: String,
        required: [true, "Enter First Name"],

    },
    Last_Name: {
        type: String,
        required: [true, "Enter Last Name"],
    },
    Username: {
        type: String,
        require: true,
        lowercase: true
    },
    Password: {
        type: String,
        require: true
    },
    Create_Date: {
        type: Date,
        default: Date.now
    }
})

let accCollection = mongoose.model("Detail_acc", accountSchema);
module.exports = accCollection;