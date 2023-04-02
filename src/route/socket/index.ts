import { MessageType } from '@prisma/client'
import { Server as HttpServer } from 'http'
import { Server as SocketServer } from 'socket.io'

import prisma from '../../prisma'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../types/socket.types'
import verifyCookie from './verifyCookie'

const socket = (server: HttpServer) => {
  const io = new SocketServer<ClientToServerEvents, ServerToClientEvents>(
    server,
  )

  io.on('connection', async (socket) => {
    // console.log('A user has connected.')
    const userId = verifyCookie(socket.handshake.headers.cookie)
    if (!userId) return socket.disconnect()
    // console.log(userId)
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    })
    if (!user) return socket.disconnect()

    const username = user.username

    socket.on('join', (roomId: string) => {
      if (socket.rooms.has('chat:' + roomId)) return
      socket.join('chat:' + roomId)
      io.to('chat:' + roomId).emit(
        'notify',
        `A ${username} has joined the room. (${roomId})`,
      )
    })

    socket.on('leave', (roomId: string) => {
      if (!socket.rooms.has('chat:' + roomId)) return
      socket.leave('chat:' + roomId)
      io.to('chat:' + roomId).emit(
        'notify',
        `A ${username} has left the room. (${roomId})`,
      )
    })

    socket.on(
      'chatMessage',
      (roomId: string, type: MessageType, message: string) => {
        if (!socket.rooms.has('chat:' + roomId)) return
        io.to('chat:' + roomId).emit('chatMessage', {
          sender: username,
          profileImage: user.profileImage,
          roomId,
          type,
          message,
          timestamp: new Date(),
        })
        io.to('room:' + roomId).emit('notify', roomId)
      },
    )

    socket.on('addRoom', (roomId: string, userId: string) => {
      if (socket.rooms.has('room:' + roomId)) return
      if (!userId) return socket.join('room:' + roomId)
      socket.join('room:' + roomId)
      socket.to(userId).emit('invite', roomId)
    })

    // socket.on('disconnect', () => {
    //   console.log('A user has disconnected.')
    // })
  })

  return io
}

export default socket
