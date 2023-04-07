import { Request, Response } from 'express'

import prisma from '../../prisma'

const getGroups = async (req: Request, res: Response) => {
    try{
        const rawGroups = await prisma.chatRoom.findMany()
        const groups = rawGroups.map(group => {
            return {
                chatRoomId: group.chatRoomId,
                name: group.name,
            }
        })
        return res.status(200).send(groups)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get groups endpoint')
    }
}

export default getGroups