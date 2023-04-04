import express from 'express'

import roomHistory from './roomHistory'

const router = express.Router()

router.get('/rooms/:roomId/history', roomHistory)

export default router
