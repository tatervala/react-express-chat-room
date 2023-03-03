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

/* listen for client connections */

let chatRoom = ''
let users = []

io.on('connection', (socket) => {
  console.log(`Connection with id of ${socket.id}`)
  socket.on('join_room', (data) => {
    const {username, room} = data
    socket.join(room)

    /* send a message when an user joins the room to other users */

    let currentTime = Date.now()        
    socket.to(room).emit('receive_message', {
      
    })
    /* send a message to the joined user */
    socket.emit('receive_messege', {
      message: `Welcome ${username} `,
      username: 'CHAT_BOT',
      currentTime,
    })
    chatRoom = room
    users.push({id: socket.id, username, room})
    console.log(users)
    let currentUsers = users.filter((user => user.room === room))
    socket.to(room).emit('chatroom_users', currentUsers)
  })
})

/* test the server */

app.get('/', (req, res) => {
    res.send('Server is running')
  })

server.listen(4000, () => 'Server is running on port 4000')