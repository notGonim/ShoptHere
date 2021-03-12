import { ErrorHandler } from "../utils/errorHandler.js"


export const errors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if (process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(err.statusCode).json(
            {
                success: false,
                error: err,
                errMessage: err.message,
                stack: err.stack
            }
        )
    }
    if (process.env.NODE_ENV === "PRODUCTION") {
        const error = { ...err }
        error.message = err.message

        //wrong mongoose object ID error
        if (err.name === 'CastError') {
            const message = `Resources not found . Invalid : ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        //handle mongoose validation error 
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message)
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json(
            {
                success: false,
                message: error.message || 'Internal Server Error',

            }
        )
    }


    res.status(err.statusCode).json(
        {
            success: false,
            error: err.stack
        }
    )
}