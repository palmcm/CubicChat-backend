import { Request, Response } from 'express'

import prisma from '../../prisma'
import { getStickersDto } from '../../types/chat.types'

const getStickers = async (req: Request, res: Response) => {
    try{
        const stickers: getStickersDto = {
            stickers: await prisma.sticker.findMany({
                select: {
                    stickerName: true,
                    stickerUrl: true
                }
             })
        }
        return res.status(200).send(stickers)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get stickers endpoint')
    }
}

export default getStickers