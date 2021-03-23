import express from 'express'
import { processPayment, sendStripeAPI } from '../controllers/payment-control.js'
import { isUserAuthenticated, authorizeRoles } from '../middleware/auth-routes.js'





export const PaymentRouter = express.Router()



PaymentRouter.post('/payment/process', isUserAuthenticated, processPayment)
PaymentRouter.get('/stripeapi', isUserAuthenticated, sendStripeAPI)








