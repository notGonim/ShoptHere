import Product from "../models/product-model.js"
import dotEnv from 'dotenv'
import { connectDB } from '../config/db.js'




export const seedProducts = async () => {
/*    try {
        await Product.deleteMany()
        console.log('all products are deleted')
        await Product.insertMany(products)
        console.log('added all the product in the product json file')
    } catch (err) {
        console.log(err)
        process.exit()
    }
}


*/}