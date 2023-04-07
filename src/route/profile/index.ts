import { Request, Response } from 'express'
import express from 'express'

import edit_name from './edit_name'
import getUserProfile from './getUserProfile'

const router = express.Router()

router.get('/', getUserProfile)

router.put('/username-edit', edit_name)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.put('/image-random', (req: Request, res: Response) => {
  // code to random a user's profile image
})

export default router
