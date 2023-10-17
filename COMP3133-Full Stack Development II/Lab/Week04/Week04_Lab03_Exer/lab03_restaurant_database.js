const express = require('express')
const mongoose = require('mongoose')
const restaurantRouter = require('./routes/restaurantRoutes')

const app = express()
app.use(express.json())
var PORT = 3000

mongoose.connect('mongodb+srv://minhnhatvo:vominhnhat012@cluster0.vvf5kms.mongodb.net/W2023_COMP3133_Lab?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection
db.on('error', () => {console.error(error)})
db.once('open', () => {console.error('Success Mongodb connection')})

// app.use('/restaurants',restaurantRouter)
app.use(restaurantRouter)


app.listen(PORT, () => {console.log("Server running...")})





