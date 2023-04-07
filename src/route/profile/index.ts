import express from 'express'

import edit_name from './editName'
import getUserProfile from './getUserProfile'
import randomImage from './randomImage'

const router = express.Router()

router.get('/', getUserProfile)

router.put('/username-edit', edit_name)

router.put('/image-random', randomImage)

export default router
