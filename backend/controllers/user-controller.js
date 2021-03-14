import { asyncError } from "../middleware/catchAsyncErrors.js"
import User from "../models/user-modek.js"
import { ErrorHandler } from "../utils/errorHandler.js"


//register a user => api/v1/register
export const registerUser = asyncError(async (req, res, next) => {

    const { name, email, password } = req.body
    const user=await User.create(
        {
            name,
            email,
            password,

        }
    )
    
})