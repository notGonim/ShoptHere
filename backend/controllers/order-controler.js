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




