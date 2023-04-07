import { Request, Response } from 'express'

import prisma from '../../prisma'

const getUsers = async (req: Request, res: Response) => {
    try{
        const rawUsers = await prisma.user.findMany()
        const users = rawUsers.map(user => {
            return {
                userId: user.userId,
                username: user.username,
                profileImage: user.profileImage
            }
        })
        return res.status(200).send(users)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get users endpoint')
    }
}

export default getUsers