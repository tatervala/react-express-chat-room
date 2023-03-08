import express from 'express'
const app = express()
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'


app.use(cors())

const server = http.createServer(app)

/* io server with cors access */
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})


let chatRoom = ''
let allUsers = []
let currentUsers = []

/* io event when user joins a room */

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`)
  socket.on('join_room', (data) => {
    const {username, room} = data
    socket.join(room) 

    let currentTime = Date.now()
    
    /* emit message to every one in the room */

    socket.to(room).emit('receive_message', {
      message: `${username} has joined`,
      username: 'bot',
      currentTime,
    })

    /* emit message to only joined user */

    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: 'bot',
      currentTime,
    })
    chatRoom = room
    allUsers.push({ id: socket.id, username, room })  
    currentUsers= allUsers.filter((user) => user.room === room) // filter users only to current room
    socket.to(room).emit('chatroom_users', currentUsers)
    socket.emit('chatroom_users', currentUsers)
  })
  /* send message to every user on the room */
  socket.on('send_message', (data) => {
    const { message, username, room, currentTime} = data
    
    io.in(room).emit('receive_message', data)
  })
  


});
app.get('/', (req, res) => {
  res.send('Server is running')
})
server.listen(4000, () => 'Server is running on port 3000');