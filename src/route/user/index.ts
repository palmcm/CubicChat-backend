import express from 'express'

import getUserChatRoom from './getUserChat'
import getUsers from './getUsers'

const router = express.Router()

router.get('/:userId/chat', getUserChatRoom)
router.get('', getUsers)

export default router
