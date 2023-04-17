import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import { createServer as createHttpServer } from 'http'
import { createServer as createHttpsServer } from 'https'

import authMiddleware from './middleware/auth'
import authRouter from './route/auth'
import chatRouter from './route/chat'
import groupRouter from './route/group'
import profileRouter from './route/profile'
import chatSocket from './route/socket'
import userRouter from './route/user'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(
  cors({
    origin: ['https://cubicchat.cubiccopper.net', 'http://localhost:5173'],
    credentials: true,
  }),
)

let httpServer
if (process.env.NODE_ENV === 'production') {
  const key = fs.readFileSync(__dirname + '/../ssl/privatekey.pem')
  const cert = fs.readFileSync(__dirname + '/../ssl/certificate.pem')
  httpServer = createHttpsServer({ key, cert }, app)
} else {
  httpServer = createHttpServer(app)
}
chatSocket(httpServer)

const port = process.env.PORT || 3000

app.use('/auth', authRouter)
app.use('/profile', authMiddleware, profileRouter)
app.use('/users', authMiddleware, userRouter)
app.use('/groups', authMiddleware, groupRouter)
app.use('/chat', authMiddleware, chatRouter)

app.use('/hello', (req, res) => {
  res.send('Hello world')
})

httpServer.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
