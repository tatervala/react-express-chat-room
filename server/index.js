import express from 'express'
const app = express()
import { createServer } from 'http'
import cors from 'cors'


app.use(cors())

const server = createServer(app)

/* test server */

app.get('/', (req, res) => {
    res.send('Hello world');
  })

server.listen(4000, () => 'Server is running on port 4000')