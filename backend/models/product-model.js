import mongoose from 'mongoose'



const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please Enter Product Name '],
            trim: true,
            maxLength: [100, 'Product Name Must not Exceed 100 characters']
        },
        price: {
            type: Number,
            required: [true, 'Please Enter Product Price'],
            maxLength: [100, 'Product Name Must not Exceed 100 characters'],
            default: 0.0,
        },
        description: {
            type: String,
            required: [true, 'Please Enter Description'],
        },
        rating: {
            type: Number,
            default: 0.0
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        category: {
            type: String,
            required: [true, 'Please Select Category for the product'],
            enum: {
                values: [
                    'Electronics',
                    'Cameras',
                    'Phones',
                    'Laptop',
                    'Accessories',
                    'Headphones',
                    'Food',
                    'Books',
                    'Clothes/shoes',
                    'Sports',
                    'Home'
                ],
                message: 'Please Select Category for the Product'
            }
        },
        seller: {
            type: String,
            required: [true, 'Please the product Seller'],
        },
        stock: {
            type: Number,
            required: [true, 'Please Enter Product Stock'],
            maxLength: [5, 'Product Stock  Must not Exceed 5 characters'],
            default: 0
        },
        numberOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                name: {
                    type: String,
                    required: true
                },
                ratings: {
                    type: Number,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const Product = mongoose.model('Products', productSchema)
export default Product