import cookie from 'cookie'
import jwt from 'jsonwebtoken'

const verifyCookie = (cookies: string | undefined) => {
  if (!cookies) return null
  const token = cookie.parse(cookies).token
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET!)
    return (userData as { userId: string }).userId
  } catch (error) {
    return null
  }
}

export default verifyCookie
