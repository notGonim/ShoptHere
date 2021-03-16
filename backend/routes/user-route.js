import express from 'express'
import { registerUser, userLogin, updatePassword, getUserProfile, userLogout } from '../controllers/user-controller.js'
import { isUserAuthenticated } from '../middleware/auth-routes.js'

export const UserRouter = express.Router()


UserRouter.post('/register', registerUser)
UserRouter.post('/login', userLogin)
UserRouter.get('/logout', userLogout)
UserRouter.get('/me', isUserAuthenticated, getUserProfile)
UserRouter.get('/password/update', isUserAuthenticated, updatePassword)


