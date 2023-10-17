var express = require('express')
var socket = require('socket.io')

var app = express()

var PORT = 8088

var server = app.listen(PORT, () => {
    console.log("Socket server running at " + PORT);
})

// http://localhost:8088/
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

var io = socket(server)

io.on("connection", (client) =>{
    console.log("Client connection request")
    console.log(client.id);

    client.emit("welcome", "Welcome to socket.io Chat")
    
    client.on("hello", (data) =>{
        console.log(data)
    })

    const notice = {
        status: false,
        message: "Message to all"
    }
    client.broadcast.emit("notice", notice)

    client.on("disconnect", () =>{
        console.log(`Client disconnect : ${client.id}`)
    })
})

