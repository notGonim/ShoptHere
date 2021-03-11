//this file is to handel all the login for the product router


export const getProducts = (req, res, next) => {
    res.status(200).json(
        {
            success: true,
            message: 'this router handle all the product logic and it works fine'
        }
    )
}