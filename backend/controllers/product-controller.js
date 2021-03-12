//this file is to handel all the login for the product router
import Product from "../models/product-model.js"
import { ErrorHandler } from "../utils/errorHandler.js"

//to create a new product  -> /api/v1/admin/product/new  
export const newProduct = async (req, res, next) => {

    const product = await Product.create(req.body)
    res.status(201).json(
        {
            success: true,
            product
        }
    )
}

//to get all the products from -> /api/v1/product 
export const getProducts = async (req, res, next) => {

    const products = await Product.find()
    res.status(200).json(
        {
            success: true,
            count: products.length,
            products
        }
    )
}

//to get a single product -> /api/v1/product/:id
export const getProductById = async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    if (!product)
        return next(new ErrorHandler('Product Not Found', 404))
    res.status(200).json(
        {
            success: true,
            product
        }
    )
}

//to update product  ->/api/v1/:id
export const updateProductById = async (req, res, next) => {

    let product = await Product.findById(req.params.id)
    if (!product)
        return next(new ErrorHandler('Product Not Found', 404))
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json(
        {
            success: true,
            product
        }
    )
}

//to delete a single product by its id -> /api/admin/product/:id
export const deleteProductById = async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    if (!product)
        return next(new ErrorHandler('Product Not Found', 404))
    await product.remove()
    res.status(200).json(
        {
            success: true,
            message: 'Product is Deleted'
        }
    )
}
