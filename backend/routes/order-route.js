import express from 'express'
import { newOrder, getSingleOrder, myOrder, allOrder } from '../controllers/order-controler.js'
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth-routes.js'


export const OrderRouter = express.Router()


OrderRouter.post('/order/new', isUserAuthenticated, newOrder)
OrderRouter.get('/order/:id', isUserAuthenticated, getSingleOrder)
OrderRouter.get('/orders/me', isUserAuthenticated, myOrder)
OrderRouter.get('/admin/orders', isUserAuthenticated, authorizeRoles('admin'), allOrder)

