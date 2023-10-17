const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    address:[{
        building : {
            type: Number
            
        },
        street : {
            type: String,
            require: true
        },
        zipcode : {
            type: Number
            
        }
    }],
    city: {
        type: String,
        require: true
    },
    cuisine: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    restaurant_id: {
        type: Number,
        require: true
    },
    
})

module.exports = mongoose.model('Restaurant',restaurantSchema)