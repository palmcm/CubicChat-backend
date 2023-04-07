import { Request, Response } from 'express'

import prisma from '../../prisma'

const getStickers = async (req: Request, res: Response) => {
    try{
        const rawStickers = await prisma.sticker.findMany()
        const stickers = rawStickers.map(sticker => {
            return {
                stickerName: sticker.stickerName,
                stickerUrl: sticker.stickerUrl
            }
        })
        return res.status(200).send(stickers)
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Server error get stickers endpoint')
    }
}

export default getStickers