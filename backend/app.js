import express from 'express'
import { ProductRouter } from './routes/product-route.js'

export const app = express()


app.use(express.json())


app.use('/api/v1', ProductRouter)


