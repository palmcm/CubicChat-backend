import { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', require('./getUserProfile'))

router.put('/username-edit', (req: Request, res: Response) => {
  // code to edit a user's username
})

router.put('/image-random', (req: Request, res: Response) => {
  // code to random a user's profile image
})

export default router
