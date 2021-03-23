import { asyncError } from "../middleware/catchAsyncErrors.js"
import Stripe from 'stripe'



const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY)


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



//sending Stripe api key   => /api/stripeapi
export const sendStripeAPI = asyncError(async (req, res, next) => {

    res.status(200).json({

        stripeApiKey: process.envSTRIPE_API_KEY,
        


    })


})