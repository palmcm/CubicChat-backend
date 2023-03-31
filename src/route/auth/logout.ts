import { Request, Response } from 'express'

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token')

    res.status(200).send('User successfully logged out')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server error login endpoint')
  }
}

export default logout
