import { Request, Response } from 'express'

import prisma from '../../prisma'
import { GetUsersDto } from '../../types/user.types'

const getUsers = async (req: Request, res: Response) => {
  try {
    const search: string = req.query.search as string
    const users: GetUsersDto = {
      users: await prisma.user.findMany({
        where: {
          username: {
            contains: search,
            mode: 'insensitive',
          },
        },
        select: {
          userId: true,
          username: true,
          profileImage: true,
        },
      }),
    }
    return res.status(200).send(users)
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error get users endpoint')
  }
}

export default getUsers
