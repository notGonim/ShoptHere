//this file will handle all the routes for the product 

import express from 'express'
import { newProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../controllers/product-controller.js'

export const ProductRouter = express.Router()




ProductRouter.get('/products', getProducts)
ProductRouter.get('/product/:id', getProductById)
ProductRouter.post('/admin/product/new', newProduct)
ProductRouter.put('/admin/product/:id', updateProductById)
ProductRouter.delete('/admin/product/:id', deleteProductById)
