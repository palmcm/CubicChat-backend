import { ChatRoomType } from '@prisma/client'
import { Request, Response } from 'express'

import prisma from '../../prisma'
import { GetGroupDto, GetGroupsDto } from '../../types/group.types'

const getGroups = async (req: Request, res: Response) => {
  try {
    const groups: GetGroupDto[] = await prisma.chatRoom.findMany({
      where: {
        chatRoomType: ChatRoomType.GROUP,
        NOT: {
          name: null,
        },
      },
      select: {
        chatRoomId: true,
        name: true,
      },
    })

    const data: GetGroupsDto = { groups }

    return res.status(200).send(data)
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error get groups endpoint')
  }
}

export default getGroups
