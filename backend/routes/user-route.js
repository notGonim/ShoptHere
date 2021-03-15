import express from 'express'
import { registerUser, userLogin, userLogout } from '../controllers/user-controller.js'

export const UserRouter = express.Router()


UserRouter.post('/register', registerUser)
UserRouter.post('/login', userLogin)
UserRouter.get('/logout', userLogout)

