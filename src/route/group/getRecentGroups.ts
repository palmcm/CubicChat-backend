import { Request, Response } from 'express'

import prisma from '../../prisma'

const getRecentGroups = async (req: Request, res: Response) => {
    try{
        const userId: string = res.locals.userId
        const rawGroups = await prisma.chatRoom.findMany({
            where: {
                User: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                User: true
            }
        })
        const unsortedGroups = rawGroups.map(group => {
            return {
                chatRoomId: group.chatRoomId,
                name: group.name,
                chatRoomType: group.chatRoomType,
                updatedAt: group.updatedAt,
            }
        })
        unsortedGroups.sort((a, b) => {
            return b.updatedAt.getTime() - a.updatedAt.getTime()
        })
        const groups = unsortedGroups.map(group => {
            return {
                chatRoomId: group.chatRoomId,
                name: group.name,
                chatRoomType: group.chatRoomType,
            }
        })
        return res.status(200).send(groups)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get recent groups endpoint')
    }
}

export default getRecentGroups