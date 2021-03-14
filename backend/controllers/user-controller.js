import { asyncError } from "../middleware/catchAsyncErrors.js"
import User from "../models/user-modek.js"
import { ErrorHandler } from "../utils/errorHandler.js"


//register a user => api/v1/\\register
export const registerUser = asyncError(async (req, res, next) => {

    const user = await User.create(req.body)

    const token =  user.getJwtToken()
    res.status(201).json({
        success: true,
        token
    })
})