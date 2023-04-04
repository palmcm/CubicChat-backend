import { Request, Response } from 'express'

import prisma from '../../prisma'

const joinGroup = async (req: Request, res: Response) => {
  try {
    const roomId: string = req.params.roomId
    const userId: string = res.locals.userId

    const room = await prisma.chatRoom.findFirst({
      where: {
        chatRoomId: roomId,
        User: {
          some: {
            userId: userId,
          },
        },
      },
    })

    if (!room) {
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
