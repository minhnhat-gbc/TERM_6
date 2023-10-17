const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
const socket = io()

// Get username and room
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// Get in room
socket.emit('joinRoom', { username, room })

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    ouptputUsers(users)
})

socket.on('message', message => {
    console.log(message)
    printMessage(message)

    // scroll down auto
    chatMessage.scrollTop = chatMessage.scrollHeight
})

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let msg = e.target.elements.msg.value
    socket.emit('chatMess', msg)

    //clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

let printMessage = (message) => {
    let div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

// Add room name to DOM
let outputRoomName = (room) => {
    roomName.innerText = room
}

// Add users to document
let ouptputUsers = (users) => {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join()}
    `
}
