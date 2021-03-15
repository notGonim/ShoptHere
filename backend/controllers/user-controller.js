import { asyncError } from "../middleware/catchAsyncErrors.js"
import User from "../models/user-modek.js"
import { ErrorHandler } from "../utils/errorHandler.js"
import { sendToken } from "../utils/jwtTokens.js"


//register a user => api/v1/\\register
export const registerUser = asyncError(async (req, res, next) => {

    const user = await User.create(req.body)

    const token = user.getJwtToken()
    res.status(201).json({
        success: true,
        token
    })
})

//login user => api/login
export const userLogin = asyncError(async (req, res, next) => {

    const { email, password } = req.body
    //check if email & password is entered by user 
    if (!email || !password) {
        return next(asyncError('Please Enter email and password'))
    }
    //finding user in Databases
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(asyncError('User not found Please enter Valid Email and Password', 401))
    }
    //check if password is correct or not 
    const isPasswordMatch = await user.matchPassword(password)
    if (!isPasswordMatch) {
        return next(asyncError('User not found Please enter Valid Email and Password', 401))
    }
    const token = user.getJwtToken()
    sendToken(user, 200, res)
})

//logout user 
export const userLogout = asyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})