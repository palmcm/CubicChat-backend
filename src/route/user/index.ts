import express from 'express'

import getUserChatRoom from './getUserChat'

const router = express.Router()

router.get('/:userId/chat', getUserChatRoom)

export default router
