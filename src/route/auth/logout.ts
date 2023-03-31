import { Request, Response } from 'express'
import prisma from '../../prisma'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token')

    res.status(200).send('User successfully logged out')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error login endpoint')
  }
}
