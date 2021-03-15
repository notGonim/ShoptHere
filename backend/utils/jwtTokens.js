//create and send tokens and save in cookie

export const sendToken = (user, statusCode, res) => {
    //create JWT token
    const token = user.getJwtToken()
    //option for cookie
    const option = {
        expire: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, option).json({
        success: true,
        token,
        user
    })
}