import express from 'express'

import editName from './editName'
import getUserProfile from './getUserProfile'
import randomImage from './randomImage'

const router = express.Router()

router.get('/', getUserProfile)

router.put('/username-edit', editName)

router.put('/image-random', randomImage)

export default router
