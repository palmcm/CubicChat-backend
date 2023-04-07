import express from 'express'

import createGroup from './createGroup'
import joinGroup from './joinGroup'

const router = express.Router()

router.post('/create', createGroup)

router.get('/:roomId/join', joinGroup)

export default router
