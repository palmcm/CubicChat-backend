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
        return res.status(200).send(groups)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get recent groups endpoint')
    }
}

export default getRecentGroups