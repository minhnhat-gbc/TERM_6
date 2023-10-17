const mongoose = require('mongoose')

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
} 

const UserSchema = new mongoose.Schema({
     username: {
        type: String,
        require: [true, 'Please enter username correctly'],
        // unique: [true, 'This username already existed'],
        lowercase: true 
     },
    email: {
        type: String,
        require: [true, 'Email require'],
        unique: [true, 'This email have been used to register'],
        validate: [validateEmail, 'Please input form correctly'],
        trim: true        
    },
    password: {
        type: String,
        require: [true, 'Please enter password'],
        trim: true,
        minLenght: 8
    },
    token:{
        type: String
    },
    created: { 
        type: Date,
        default: Date.now,
        alias: 'createdat'
      },
    updatedat: { 
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User_accounts", UserSchema)
module.exports = User