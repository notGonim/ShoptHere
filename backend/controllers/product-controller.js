

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
export const getProducts = (req, res, next) => {
    res.status(200).json(
        {
            success: true,
            message: 'this router handle all the product logic and it works fine'
        }
    )
}