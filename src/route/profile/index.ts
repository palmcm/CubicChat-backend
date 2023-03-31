import { Request, Response } from 'express'
import express from 'express'

import getUserProfile from './getUserProfile'

const router = express.Router()

router.get('/', getUserProfile)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.put('/username-edit', (req: Request, res: Response) => {
  // code to edit a user's username
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.put('/image-random', (req: Request, res: Response) => {
  // code to random a user's profile image
})

export default router
