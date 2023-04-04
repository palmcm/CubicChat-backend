import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'

import authMiddleware from './middleware/auth'
import authRouter from './route/auth'
import profileRouter from './route/profile'
import chatSocket from './route/socket'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost',
  }),
)

const httpServer = createServer(app)
chatSocket(httpServer)

const port = process.env.PORT || 3000

app.use('/', (req, res) => {
  res.send('Hello world')
})

app.use('/auth', authRouter)
app.use('/profile', authMiddleware, profileRouter)

httpServer.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
