import express from 'express'
import { errors } from './middleware/errors.js'
import { ProductRouter } from './routes/product-route.js'
import { UserRouter } from './routes/user-route.js'
import cookieParser from 'cookie-parser'
import { OrderRouter } from './routes/order-route.js'
import bodyParser from 'body-parser'
import { PaymentRouter } from './routes/payment-route.js'
export const app = express()


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())





//to handle all the routes that related to products
app.use('/api', ProductRouter)
app.use('/api', UserRouter)
app.use('/api', OrderRouter)
app.use('/api',PaymentRouter)





//middleware to handle all errors 
app.use(errors)




