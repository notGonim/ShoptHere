import express from 'express'
import { newOrder } from '../controllers/order-controler'
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth-routes.js'


export const OrderRouter = express.Router()


OrderRouter.post('/order/new', isUserAuthenticated, newOrder)