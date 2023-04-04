import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import prisma from '../../prisma'

const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email
    const password: string = req.body.password
    if (!email || !password) return res.status(400).send('Bad request')
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) return res.status(401).send('Email or password is incorrect')
    const isPasswordCorrect: boolean = await bcrypt.compareSync(
      password,
      user.password,
    )
    if (!isPasswordCorrect)
      return res.status(401).send('Email or password is incorrect')
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    })

    return res.status(200).send('User successfully logged in')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error login endpoint')
  }
}

export default login
