import express from 'express'
import { login, logout, Register } from '../controllers/authControllers.js'

const authRouter=express.Router()

authRouter.post('/register', Register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

export default authRouter