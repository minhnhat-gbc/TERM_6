const mongoose = require('mongoose')

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: [true, 'Please enter First Name']
    },
    last_name: {
        type: String,
        require: [true, 'Please enter Last Name']
    },
    email: {
        type: String,
        require: [true, 'Please enter Email!'],
        unique: [true, 'Email have been used to register!'],
        validate: [validateEmail, 'Please enter email correctly!'],
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    salary: {
        type: Number,
        default: 0.0,
        validate(value) {
          if (value < 0.0){
             throw new Error("Negative Salary aren't real.");
          }
        }
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

const Employee = mongoose.model("Employees", EmployeeSchema)
module.exports = Employee
