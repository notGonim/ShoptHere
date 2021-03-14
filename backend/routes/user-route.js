import express from 'express'
import { registerUser } from '../controllers/user-controller.js'

export const UserRouter = express.Router()


UserRouter.post('/register',registerUser)

