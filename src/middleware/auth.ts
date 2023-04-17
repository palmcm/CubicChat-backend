import { Request, Response } from 'express'
import jwt, { VerifyCallback } from 'jsonwebtoken'

const auth = async (req: Request, res: Response, next: () => void) => {
  try {
    const bearerHeader = req.headers.authorization
    if (!bearerHeader) return res.status(401).send('Not login')
    const token = bearerHeader.split(' ')[1]
    if (!token) return res.status(401).send('Not login')

    const verifyCallback: VerifyCallback = (err, decoded) => {
      if (err) return res.status(401).send('Not login')
      res.locals.userId = (decoded as { userId: string }).userId
      next()
    }

    jwt.verify(token, process.env.JWT_SECRET!, verifyCallback)
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error auth middleware')
  }
}

export default auth
