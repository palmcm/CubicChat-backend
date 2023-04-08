import { Request, Response } from 'express'

import prisma from '../../prisma'
import { getUserProfileDto } from '../../types/profile.types'

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.userId
    const profile: getUserProfileDto | null = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        username: true,
        profileImage: true,
      },
    })
    return res.status(200).send(JSON.stringify(profile))
  } catch (error) {
    return res.status(500).send('Server error get user profile endpoint')
  }
}

export default getUserProfile
