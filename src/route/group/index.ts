import express from 'express'

import createGroup from './createGroup'
import getGroupInfo from './getGroupInfo'
import getGroups from './getGroups'
import getRecentGroups from './getRecentGroups'
import joinGroup from './joinGroup'

const router = express.Router()

router.post('/', createGroup)

router.put('/:roomId/join', joinGroup)

router.get('', getGroups)

router.get('/recent', getRecentGroups)

router.get('/:roomId/info', getGroupInfo)

export default router
