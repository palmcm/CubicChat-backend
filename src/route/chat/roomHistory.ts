import { Request, Response } from 'express'

import prisma from '../../prisma'
import { GetChatMessageDto } from '../../types/room.types'

const roomHistory = async (req: Request, res: Response) => {
  try {
    const roomId: string = req.params.roomId
    const take: number = req.query.take
      ? parseInt(req.query.take as string)
      : 10
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1

    const chatCount: number = await prisma.message.count({
      where: {
        chatRoomId: roomId,
      },
    })

    const messages = await prisma.message.findMany({
      where: {
        chatRoomId: roomId,
      },
      take,
      skip: (page - 1) * take,
      select: {
        sender: {
          select: {
            username: true,
            profileImage: true,
          },
        },
        messageType: true,
        content: true,
        createdAt: true,
      },
    })

    const formatMessages: GetChatMessageDto[] = messages.map((message) => {
      return {
        senderId: message.sender.username,
        senderName: message.sender.username,
        profileImage: message.sender.profileImage,
        messageType: message.messageType,
        content: message.content,
        timestamp: message.createdAt,
      }
    })

    const maxPage = Math.ceil(chatCount / take)
    return res.status(200).send(
      JSON.stringify({
        maxPage,
        messages: formatMessages,
      }),
    )
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error get room history endpoint')
  }
}

export default roomHistory
