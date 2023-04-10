import { ChatRoomType } from '@prisma/client'
import { Request, Response } from 'express'

import prisma from '../../prisma'
import { getRecentGroupDto } from '../../types/group.types'

const getRecentGroups = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.userId
    const search: string = req.query.search as string
    const groups = await prisma.chatRoom.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        User: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        chatRoomId: true,
        name: true,
        chatRoomType: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    groups.sort((a, b) => {
      const atime = a.messages[0]?.createdAt.getTime() || a.createdAt.getTime()
      const btime = b.messages[0]?.createdAt.getTime() || b.createdAt.getTime()
      return btime - atime
    })

    const recents: getRecentGroupDto[] = await Promise.all(
      groups.map(async (group) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { messages, createdAt, ...rest } = group
        if (group.chatRoomType === ChatRoomType.GROUP)
          return { ...rest, name: rest.name || 'Unknown' }
        const otherUser = await prisma.chatRoom.findFirst({
          where: {
            chatRoomId: group.chatRoomId,
          },
          select: {
            User: {
              where: {
                userId: {
                  not: userId,
                },
              },
            },
          },
        })
        if (otherUser === null) return { ...rest, name: 'Unknown' }
        return {
          ...rest,
          name: otherUser.User[0].username,
          imageUrl: otherUser.User[0].profileImage,
        }
      }),
    )

    return res.status(200).send({ groups: recents })
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error get recent groups endpoint')
  }
}

export default getRecentGroups
