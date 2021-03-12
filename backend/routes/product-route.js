//this file will handle all the routes for the product 

import express from 'express'
import { newProduct, getProducts } from '../controllers/product-controller.js'

export const ProductRouter = express.Router()




ProductRouter.get('/products', getProducts)
ProductRouter.post('/product/new', newProduct)
