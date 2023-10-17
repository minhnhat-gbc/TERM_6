const mongoose = require('mongoose')
// const validate = require('mongoose-validator')

// const validateCity = [
//     validate({
//         validator: 'isAlphanumeric',
//         passIfEmpty: false,
//         message: 'City should contain alpha-numeric characters only',
//     }),

// ]

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

const validateWebsite = (web) => {
    return web.substring(0, 7) === "http://" || web.substring(0, 8) === "https://"
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validateEmail, 'Please correct form'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: {
        street: {
            type: String,
            required: true
        },
        suite: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
            validate: [/^[A-Za-z\s]*$/, "City can contain alpha and space"]
        },
        zipcode: {
            type: String,
            required: true,
            validate: [/[0-9]{5}\-[0-9]{4}/, "Zip have to be 12345-1234 format"]
        },
        geo: {
            lat: {
                type: String,
                required: true
            },
            lng: {
                type: String,
                required: true
            }
        }

    },
    phone: {
        type: String,
        required: true,
        validate: [/[0-9]{1}\-[0-9]{3}\-[0-9]{3}\-[0-9]{4}/, "Phone have to be 1-123-123-1234 format"]
    },
    website: {
        type: String,
        required: true,
        validate: [validateWebsite, "Website incorrect format"]
    },
    company: {
        name: {
            type: String,
            required: true
        },
        catchPhrase: {
            type: String,
            required: true
        },
        bs: {
            type: String,
            required: true
        }
    }
})


const User = mongoose.model("Users", userSchema)
module.exports = User