import { Request, Response } from 'express'

import prisma from '../../prisma'
import { GetChatMessageDto } from '../../types/room.types'

const roomHistory = async (req: Request, res: Response) => {
  try {
    const roomId: string = req.params.roomId
    const take: number = req.query.take
      ? parseInt(req.query.take as string)
      : 10
    const lastGetMessage: string | undefined = req.query.lastMessage
      ? req.query.lastMessage.toString()
      : undefined

    const firstMessage = await prisma.message.findFirst({
      where: {
        chatRoomId: roomId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        messageId: true,
      },
    })

    let messages
    if (!lastGetMessage) {
      messages = await prisma.message.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          chatRoomId: roomId,
        },
        take,
        select: {
          messageId: true,
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
    } else {
      messages = await prisma.message.findMany({
        distinct: ['messageId'],
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          chatRoomId: roomId,
        },
        cursor: {
          messageId: lastGetMessage,
        },
        take,
        skip: 1,
        select: {
          messageId: true,
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
    }

    const formatMessages: GetChatMessageDto[] = messages.map((message) => {
      return {
        messageId: message.messageId,
        senderId: message.sender.username,
        senderName: message.sender.username,
        profileImage: message.sender.profileImage,
        messageType: message.messageType,
        content: message.content,
        timestamp: message.createdAt,
      }
    })
    console.log(messages)
    return res.status(200).send({
      isLastPage:
        messages.length < take ||
        firstMessage?.messageId === messages[take - 1].messageId,
      messages: formatMessages,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error get room history endpoint')
  }
}

export default roomHistory
