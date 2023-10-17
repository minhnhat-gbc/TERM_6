const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const hbs = require('hbs')
const logInModels = require('./models/login')
const bcrypt = require('bcryptjs')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/message')
const { userJoin, getCurrentUser, getRoomUsers, userLeave } = require('./utils/user')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

let PORT_URL = process.env.PORT || 8081
let viewPath = path.join(__dirname, 'views')
app.use(express.json())

app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(viewPath))

let chatAdmin = 'Admin'
// Run when client in
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        socket.emit('message', formatMessage(chatAdmin, 'Welcome to Chat Chit (^!^))'))

        socket.broadcast.to(user.room).emit('message', formatMessage(chatAdmin, `${user.username} has joined the chat`))
    })

    // send user and room in4
    // io.emit('roomUsers', {
    //     room: user.room,
    //     users: getRoomUsers(user.room)
    // })

    socket.on('chatMess', (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if (user) {
            io.to(user.room).emit('message', formatMessage(chatAdmin, `${user.username} has left the chat`))

            // send user and room in4
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }

    })

})





app.use(express.urlencoded({ extended: false }))

let mongodb = 'mongodb+srv://minhnhatvo:vominhnhat012@cluster0.vvf5kms.mongodb.net/W2023_COMP3133_Lab_Test01?retryWrites=true&w=majority'

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
})

app.get('/', (req, res) => {
    res.render('login')
})


app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/boxchat', (req, res) => {
    res.render('boxChat')
})

app.get('/homeChat', (req, res) => {
    res.render('homeChat')
})

app.post('/login', async (req, res) => {
    let errors = []
    if (req.body.password.length < 5) {
        errors.push({ text: '**Password at least 5 character**' })
    }
    if (errors.length > 0) {
        res.status(400).render('signup', {
            errors: errors,
            First_Name: req.body.fn,
            Last_Name: req.body.ln,
            Username: req.body.username,
            Password: req.body.password
        })
    }
    else {
        await logInModels.findOne({ Username: req.body.username })
            .then((user) => {
                if (user) {
                    let errors = []
                    errors.push({ text: '**Username already existed**' })
                    res.status(400).render('signup', {
                        errors: errors,
                    })
                } else {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(req.body.password, salt);
                    var newUser = {
                        First_Name: req.body.fn,
                        Last_Name: req.body.ln,
                        Username: req.body.username,
                        // Password: hash
                        Password: req.body.password
                    }
                    new logInModels(newUser).save((e, user) => {
                        if (e) throw e
                        if (user) {
                            let success = []
                            success.push({ text: '^^Registered successfully^^' })
                            res.status(200).render('login', {
                                success: success,
                            })
                        }
                    })

                }
            })
    }
})


app.post('/homeChat', async (req, res) => {
    try {
        let check = await logInModels.findOne({
            Username: req.body.username
        })
        if (check.Password === req.body.password) {
            let success = []
            success.push({ text: '^^Login successfully^^' })
            res.status(200).render('homeChat', {
                success: success
            })
        }
        else {
            let errors = []
            errors.push({ text: '!!Wrong password!!' })
            res.status(400).render('login', {
                errors: errors,
            })
        }
    } catch (e) {
        let errors = []
        errors.push({ text: '!!Username does not exists!!' })
        res.status(400).render('login', {
            errors: errors,
        })
    }
})

// app.get('/homeChat',(req, res) => {
//     res.render('homeChat')
// })

//http://localhost:8081/
server.listen(PORT_URL, () => {
    console.log(`Server is running at ${PORT_URL}`)
})



