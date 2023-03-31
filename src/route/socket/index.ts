import { Server as HttpServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket.types'

const socket = (server: HttpServer) => {
  const io = new SocketServer<ClientToServerEvents, ServerToClientEvents>(
    server,
  )

  io.on('connection', (socket) => {
    console.log('A user has connected.')

    socket.on('chatMessage', (data: string) => {
      io.emit('chatMessage', data)
    })

    socket.on('disconnect', () => {
      console.log('A user has disconnected.')
    })
  })

  return io
}

export default socket
