import { Request, Response } from 'express'
const jwt = require('jsonwebtoken')

module.exports = async (req: Request, res: Response, next: () => {}) => {
  try {
    const token = req.cookies.token
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(401).send('Unauthorized')
      res.locals.userId = decoded.userId
      next()
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error auth middleware')
  }
}
