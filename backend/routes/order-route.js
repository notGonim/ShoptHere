import express from 'express'
import { newOrder } from '../controllers/order-controler.js'
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth-routes.js'


export const OrderRouter = express.Router()


OrderRouter.post('/order/new', isUserAuthenticated, newOrder)