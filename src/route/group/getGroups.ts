import { Request, Response } from 'express'

import prisma from '../../prisma'
import {getGroupsDto } from '../../types/group.types'

const getGroups = async (req: Request, res: Response) => {
    try{
        const groups: getGroupsDto = {
            groups: await prisma.chatRoom.findMany({
                select: {
                    chatRoomId: true,
                    name: true
                },
            })
        }
        return res.status(200).send(groups)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get groups endpoint')
    }
}

export default getGroups