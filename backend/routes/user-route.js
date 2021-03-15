import express from 'express'
import { registerUser, userLogin } from '../controllers/user-controller.js'

export const UserRouter = express.Router()


UserRouter.post('/register', registerUser)
UserRouter.post('/login', userLogin)

