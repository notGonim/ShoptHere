import { errorMonitor } from "node:events"
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
//getting currently logged in user details  -> api/me
export const getUserProfile = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})

//update the password  => api/password/update

export const updatePassword = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')    //check previous user password 

    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched)
        return next(new ErrorHandler('Your Old Password Is not Correct  '))

        user.password = req.body.password;
        await user.save();
    
        sendToken(user, 200, res)
    
})

//update user profile   api/me/update
export const updateProfile = asyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    //to update the avatar 
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})

//get all users   => api/admin/users 
export const getAllUsers =asyncError(async(req,res,next)=>{
    const users =await User.find()

    res.status(200).json({
        success: true,
        users
    })
})


// Get user details   =>   /api/admin/user/:id
export const  getUserDetails = asyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})


// Update user profile   =>   /api/v1/admin/user/:id
export const updateUser = asyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete user   =>   /api/admin/user/:id
export const deleteUser = asyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    // Remove avatar from cloudinary todo 
     
    await user.remove();

    res.status(200).json({
        success: true,
    })
})


/*

//forget password
export const forgetPassword = asyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'ShopHere Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }
})
*/