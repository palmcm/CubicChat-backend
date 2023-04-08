import { ChatRoom, ChatRoomType } from '@prisma/client'
import { Request, Response } from 'express'

import prisma from '../../prisma'
import { chatRoomIdDto } from '../../types/group.types'

const getUserChatRoom = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.userId
    const receiveUserId: string = req.params.userId
    if (!receiveUserId) return res.status(400).send('No user to talk to')
    const room: ChatRoom | null = await prisma.chatRoom.findFirst({
      where: {
        chatRoomType: ChatRoomType.PRIVATE,
        AND: [
          {
            User: {
              some: {
                userId,
              },
            },
          },
          {
            User: {
              some: {
                userId: receiveUserId,
              },
            },
          },
        ],
      },
    })
    if (room !== null)
      return res
        .status(200)
        .send(JSON.stringify({ chatRoomId: room.chatRoomId }))
    const newRoom = await prisma.chatRoom.create({
      data: {
        chatRoomType: ChatRoomType.PRIVATE,
        User: {
          connect: [{ userId }, { userId: receiveUserId }],
        },
      },
    })
    const ret: chatRoomIdDto = { chatRoomId: newRoom.chatRoomId }
    return res
      .status(200)
      .send(JSON.stringify(ret))
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error get user chatroom endpoint')
  }
}

export default getUserChatRoom
