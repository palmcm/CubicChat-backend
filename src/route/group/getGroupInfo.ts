import { ChatRoomType } from '@prisma/client'
import { Request, Response } from 'express'

import prisma from '../../prisma'
import { GetGroupInfoDto } from '../../types/group.types'

const getGroupInfo = async (req: Request, res: Response) => {
    try {
        const chatRoomId: string = req.params.roomId
        const group = await prisma.chatRoom.findUnique({
        where: {
            chatRoomId,
        },
        select: {
            chatRoomId: true,
            name: true,
            chatRoomType: true,
        },
        })
        if(!group) return res.status(404).send('Group not found')
        const groupInfo: GetGroupInfoDto = {
            id: group.chatRoomId,
            name: '',
            imageUrl: undefined,
        }
        if(group.chatRoomType === ChatRoomType.PRIVATE) {
            const userId = res.locals.userId
            // find user who is not the current user and is in the chat room
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
            if (!(otherUser === null)){
                groupInfo.imageUrl = otherUser.User[0].profileImage
                groupInfo.name = otherUser.User[0].username
            }
        }
        else{
            groupInfo.name = group.name ?? ''
        }
        return res.status(200).send(groupInfo)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server error get group name endpoint')
    }
}

export default getGroupInfo