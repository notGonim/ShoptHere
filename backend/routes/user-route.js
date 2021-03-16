import express from 'express'
import { registerUser, userLogin, getUserDetails, getAllUsers, updateProfile, updatePassword, getUserProfile, userLogout } from '../controllers/user-controller.js'
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth-routes.js'

export const UserRouter = express.Router()


UserRouter.post('/register', registerUser)
UserRouter.post('/login', userLogin)
UserRouter.get('/logout', userLogout)
UserRouter.get('/me', isUserAuthenticated, getUserProfile)
UserRouter.put('/me/update', isUserAuthenticated, updateProfile)
UserRouter.get('/password/update', isUserAuthenticated, updatePassword)
UserRouter.get('/admin/users', isUserAuthenticated, authorizeRoles('admin'), getAllUsers)
UserRouter.get('/admin/users', isUserAuthenticated, authorizeRoles('admin'), getUserDetails)



