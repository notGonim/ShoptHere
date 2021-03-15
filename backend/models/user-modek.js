import mongoose from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import crypto from 'crypto'



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})
//Encrypting user`s password before saving user 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})


//return JWT 
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRE_IN
    })
}

//check is password is match
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Generate password reset Token 
userSchema.methods.getResetPasswordToken = function () {
    //generate token 
    const resetToken = crypto.randomBytes(20).toString('hex')
    //hash and set to resetPasswordToken 
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    //set token expire time 
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken
}


const User = mongoose.model('Users', userSchema)
export default User