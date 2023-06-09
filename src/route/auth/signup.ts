import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

import prisma from '../../prisma'

const signup = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email
    const password: string = req.body.password
    const username: string = req.body.username
    if (!email || !password || !username)
      return res.status(400).send('Bad request')

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (user) return res.status(409).send('User already exists')

    const hashedPassword: string = await bcrypt.hash(password, 10)
    const seed = (Math.random() * 1000).toFixed(0)
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        profileImage: `https://picsum.photos/seed/${seed}/200`,
      },
    })

    return res.status(200).send('User successfully signed up')
  } catch (error) {
    return res.status(500).send('Server error signup endpoint')
  }
}

export default signup
