import express from 'express'
const router = express.Router()

router.post('/signup', require('./signup'))

router.post('/login', require('./login'))

router.get('/logout', require('./logout'))

export default router
