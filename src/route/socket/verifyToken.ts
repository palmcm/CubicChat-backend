import jwt from 'jsonwebtoken'

const verifyToken = (token: string | undefined) => {
  if (!token) return null
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET!)
    return (userData as { userId: string }).userId
  } catch (error) {
    return null
  }
}

export default verifyToken
