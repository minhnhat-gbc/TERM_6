const express = require('express')
const mongoose = require('mongoose')
const userModel = require('./models/User')

const app = express()
app.use(express.json())

let PORT = 3000
let mongodb = 'mongodb+srv://minhnhatvo:vominhnhat012@cluster0.vvf5kms.mongodb.net/W2023_COMP3133_Lab?retryWrites=true&w=majority'

mongoose.connect(mongodb,{
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
})

app.get('/users', async (req, res) => {
    const users = await userModel.find({})
    try {
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err);
      }
})

app.post('/user', async (req, res) => {
    console.log(req.body);
    const user = new userModel(req.body)

    try{
        await user.save((err) => {
            if (err){
                res.send(err)
            }else{
                res.send(user)
            }
        })
    }catch (e) {
        res.status(500).send(e)
    }
})
// http://localhost:3000/user
app.listen(PORT, () => {
    console.log(`Sever is running at ${PORT}`);
})