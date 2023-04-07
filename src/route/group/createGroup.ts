import { ChatRoomType } from '@prisma/client'
import { Request, Response } from 'express'

import prisma from '../../prisma'

const createGroup = async (req: Request, res: Response) => {
  try {
    const name: string = req.body.name
    const userId: string = res.locals.userId

    const room = await prisma.chatRoom.create({
      data: {
        chatRoomType: ChatRoomType.GROUP,
        name,
        User: {
          connect: [{ userId }],
        },
      },
    })

    return res.status(200).send(JSON.stringify({ chatRoomId: room.chatRoomId }))
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error create group endpoint')
  }
}

export default createGroup
