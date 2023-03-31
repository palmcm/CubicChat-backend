import { Request, Response } from 'express'
import prisma from '../../prisma'

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.userId
    const profile = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        username: true,
        profileImage: true,
      },
    })
    res.status(200).send(JSON.stringify(profile))
  } catch (error) {
    res.status(500).send(error)
  }
}

export default getUserProfile
