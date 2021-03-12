//this file will handle all the routes for the product 

import express from 'express'
import { newProduct, getProducts, getProductById, updateProductById } from '../controllers/product-controller.js'

export const ProductRouter = express.Router()




ProductRouter.get('/products', getProducts)
ProductRouter.put('/admin/product/:id', updateProductById)
ProductRouter.get('/product/:id', getProductById)
ProductRouter.post('/admin/product/new', newProduct)

