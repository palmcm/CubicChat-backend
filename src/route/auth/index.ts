import express from 'express'

import login from './login'
import logout from './logout'
import signup from './signup'

const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', logout)

export default router
