import { asyncError } from "../middleware/catchAsyncErrors.js"
import stripe from 'stripe'



const stripe = ('stripe')(process.env.STRIPE_SECRETE_KEY)


export const processPayment = asyncError(async (req, res, next) => {

    const internetPayment = await stripe.PaymentIntent.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' }

    })

    res.status(200).json({
        success: true,
        client_secret: PaymentIntent.client_secret
    })

})