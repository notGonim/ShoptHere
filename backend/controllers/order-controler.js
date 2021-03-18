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
        success: true,
        order
    })
})



// get logged in user  orders by its id   -> api/orders/me 
export const myOrder = asyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})



// get all orders    -> api/admin/orders 
export const allOrder = asyncError(async (req, res, next) => {

    const orders = await Order.find()

    let totalAmount = 0
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})




// Update / Process order - ADMIN  =>   /api/admin/order/:id
export const updateOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})



//to update the stock  
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}
