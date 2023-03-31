import { createServer } from 'http'
import express from 'express'

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors')
app.use(
  cors({
    origin: 'http://localhost',
  }),
)

const httpServer = createServer(app)
const chatSocket = require('./route/socket')
const io = chatSocket(httpServer)

const port = process.env.PORT || 3000

const authRouter = require('./route/auth')
const profileRouter = require('./route/profile')
const authMiddleware = require('./middleware/auth')

app.use('/auth', authRouter)
app.use('/profile', authMiddleware, profileRouter)

httpServer.listen(3000, () => {
  console.log('Server started on port 3000')
})
