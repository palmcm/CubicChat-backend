import { Request, Response } from 'express'

import prisma from '../../prisma'
import { getUsersDto } from '../../types/user.types'

const getUsers = async (req: Request, res: Response) => {
    try{
        const users: getUsersDto = {
            users: await prisma.user.findMany({
                select: {
                    userId: true,
                    username: true,
                    profileImage: true
                }
            })
        }
        return res.status(200).send(users)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get users endpoint')
    }
}

export default getUsers