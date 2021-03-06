import { asyncError } from "../middleware/catchAsyncErrors.js"
import { ErrorHandler } from "../utils/errorHandler.js"
import jwt from 'jsonwebtoken'
import User from "../models/user-modek.js"



//check if user authenticated or not 
export const isUserAuthenticated = asyncError(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler('Login First to access this resouces ', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

//Handle user roles 
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access these resources `, 403)
            )
        }
    }
    next()
}