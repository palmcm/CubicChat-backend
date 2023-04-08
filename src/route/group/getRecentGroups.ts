import { ChatRoomType } from '@prisma/client'
import { Request, Response } from 'express'

import prisma from '../../prisma'

const getRecentGroups = async (req: Request, res: Response) => {
    try{
        const userId: string = res.locals.userId
        const groups = await prisma.chatRoom.findMany({
            where: {
                User: {
                    some: {
                        userId: userId
                    }
                }
            },
            select: {
                chatRoomId: true,
                name: true,
                chatRoomType: true,
            },
            orderBy: {
                updatedAt: 'desc'
            },
        })
        // loop for each group, if chatRoomType is private, change name to other user's name
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].chatRoomType === ChatRoomType.PRIVATE) {
                const otherUser = await prisma.user.findFirst({
                    where: {
                        AND: [
                            {
                                userId: {
                                    not: userId
                                }
                            },
                            {
                                ChatRoom: {
                                    some: {
                                        chatRoomId: groups[i].chatRoomId
                                    }
                                }
                            }
                        ]
                    },
                    select: {
                        username: true
                    }
                })
                if(!otherUser) return res.status(500).send('Other user is not found')
                groups[i].name = otherUser.username
            }
        }



        return res.status(200).send(groups)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get recent groups endpoint')
    }
}

export default getRecentGroups