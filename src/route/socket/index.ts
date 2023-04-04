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
    const userId = verifyCookie(socket.handshake.headers.cookie)
    if (!userId) return socket.disconnect()
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        username: true,
        profileImage: true,
        ChatRoom: true,
      },
    })
    if (!user) return socket.disconnect()

    const username = user.username
    const rooms = user.ChatRoom.map((room) => room.chatRoomId)

    rooms.forEach((room) => {
      socket.join('room:' + room)
    })
    socket.join('user:' + userId)

    socket.on('join', (roomId: string) => {
      if (socket.rooms.has('chat:' + roomId)) return
      socket.join('chat:' + roomId)
    })

    socket.on('leave', (roomId: string) => {
      if (!socket.rooms.has('chat:' + roomId)) return
      socket.leave('chat:' + roomId)
    })

    socket.on(
      'chatMessage',
      async (chatRoomId: string, messageType: MessageType, content: string) => {
        if (!socket.rooms.has('chat:' + chatRoomId)) return
        // await prisma.message.create({
        //   data: {
        //     senderId: userId,
        //     messageType,
        //     chatRoomId,
        //     content,
        //   },
        // })
        io.to('chat:' + chatRoomId).emit('chatMessage', {
          sender: username,
          profileImage: user.profileImage,
          chatRoomId,
          messageType,
          content,
          timestamp: new Date(),
        })
        io.to('room:' + chatRoomId).emit('notify', chatRoomId)
      },
    )

    socket.on('addRoom', async (roomId: string, receiveUserId?: string) => {
      if (socket.rooms.has('room:' + roomId)) return
      socket.join('room:' + roomId)
      if (!receiveUserId) return
      const room = await prisma.chatRoom.findFirst({
        where: {
          chatRoomId: roomId,
          User: {
            some: {
              userId: receiveUserId,
            },
          },
        },
      })
      if (!room) return
      socket.to('user:' + receiveUserId).emit('invite', roomId)
    })
  })

  return io
}

export default socket
