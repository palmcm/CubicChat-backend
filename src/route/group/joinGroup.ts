import { ChatRoomType } from '@prisma/client'
import { Request, Response } from 'express'

import prisma from '../../prisma'

const joinGroup = async (req: Request, res: Response) => {
  try {
    const roomId: string = req.params.roomId
    const userId: string = res.locals.userId

    const room = await prisma.chatRoom.findFirst({
      where: {
        chatRoomId: roomId,
      },
    })

    if (!room) return res.status(400).send('Room not found')

    const isUserInRoom = await prisma.chatRoom.findFirst({
      where: {
        chatRoomId: roomId,
        User: {
          some: {
            userId,
          },
        },
      },
    })

    if (!isUserInRoom) {
      if (room.chatRoomType === ChatRoomType.PRIVATE)
        return res.status(403).send('Room is private')
      await prisma.chatRoom.update({
        where: {
          chatRoomId: roomId,
        },
        data: {
          User: {
            connect: {
              userId: userId,
            },
          },
        },
      })
    }

    return res.status(200).send(JSON.stringify({ roomId }))
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error join group endpoint')
  }
}

export default joinGroup
