import { Request, Response } from 'express'

import prisma from '../../prisma'

const editName = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.userId
    const username: string = req.body.username
    await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        username: username,
      },
    })
    return res.status(200).send('Name successfully changed')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error edit name endpoint')
  }
}

export default editName
