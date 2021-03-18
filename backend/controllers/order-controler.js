import { asyncError } from "../middleware/catchAsyncErrors.js"
import { ErrorHandler } from "../utils/errorHandler.js"
import { ApiFeatures } from "../utils/apiFeattures.js"
import Order from "../models/order-model.js"
import Product from "../models/product-model.js"



//create new order   -> /api/order/new 
export const newOrder = asyncError(async (req, res, next) => {

    const { orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })

})


// get single order by its id   -> api/order/:id 

export const getSingleOrder = asyncError(async (req, res, next) => {

    const order = await (await Order.findById(req.params.id)).populated('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No Order Found with This ID ', 404))
    }

    res.status(200).json({
        success:true,
        order
    })
})



