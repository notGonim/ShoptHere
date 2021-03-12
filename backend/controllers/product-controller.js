

//this file is to handel all the login for the product router

import Product from "../models/product-model.js"





//to create a new product  -> /api/v1/product/new  
export const newProduct = async (req, res, next) => {

    const product = await Product.create(req.body)
    res.status(200).json(
        {
            success: true,
            product
        }
    )


}


//to get all the products
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