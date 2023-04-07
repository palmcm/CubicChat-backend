import express from 'express'

import getStickers from './getStickers'
import roomHistory from './roomHistory'

const router = express.Router()

router.get('/rooms/:roomId/history', roomHistory)
router.get('/stickers', getStickers)

export default router
