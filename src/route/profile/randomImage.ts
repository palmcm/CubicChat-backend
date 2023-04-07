import { Request, Response } from 'express'

import prisma from '../../prisma'

const randomImage = async (req: Request, res: Response) => {
    try{
        const userId: string = res.locals.userId
        const seed = (Math.random() * 1000).toFixed(0)
        await prisma.user.update({
            where: {
                userId: userId
            },
            data: {
                profileImage: `https://picsum.photos/seed/${seed}/200`
            }
        })
        return res.status(200).send('Image successfully changed')
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error random image endpoint')
    }
}

export default randomImage