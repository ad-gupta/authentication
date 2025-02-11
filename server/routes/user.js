import express from 'express'
import { loginUser, logout, registerUser } from '../controllers/user.js'

const router = express.Router()

router.post('/login', loginUser)

router.post('/register', registerUser)

router.get('/logout', logout)

export default router