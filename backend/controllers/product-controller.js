//this file is to handel all the login for the product router
import { asyncError } from "../middleware/catchAsyncErrors.js"
import Product from "../models/product-model.js"
import { ApiFeatures } from "../utils/apiFeattures.js"
import { ErrorHandler } from "../utils/errorHandler.js"

//to create a new product  -> /api/v1/admin/product/new  
export const newProduct = asyncError(async (req, res, next) => {

    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json(
        {
            success: true,
            product
        }
    )
})

//to get all the products from -> /api/v1/product?[word]
export const getProducts = asyncError(async (req, res, next) => {

    //change resPerPages to 8 once you added more products
    const resPerPage = 8
    const productCount = await Product.countDocuments()
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter()
    let products = await apiFeatures.query

    let filteredProductsCount = products.length

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query

    res.status(200).json(
        {
            success: true,
            productCount,
            resPerPage,
            filteredProductsCount,
            products
        }
    )
})

//to get a single product -> /api/v1/product/:id
export const getProductById = asyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    if (!product)
        return next(new ErrorHandler('Product Not Found', 404))
    res.status(200).json(
        {
            success: true,
            product
        }
    )
})

//to update product  ->/api/v1/:id
export const updateProductById = asyncError(async (req, res, next) => {

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
})

//to delete a single product by its id -> /api/admin/product/:id
export const deleteProductById = asyncError(async (req, res, next) => {

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
)