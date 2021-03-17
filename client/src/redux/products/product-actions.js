import axios from 'axios'


// getting all products from the   ---> api/products
export const getProducts = () => async (dispatch) => {

    try {
        dispatch({
            type: "ALL_PRODUCTS_REQUEST",
        })
        const { data } = await axios.get('/api/products')
        dispatch({
            type: "ALL_PRODUCTS_SUCCESS",
            payload: data
        })
    } catch (err) {
        dispatch({
            type: "ALL_PRODUCTS_FAIL",
            payload: err.response.data.message
        })
    }
}



//clearing errors 

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: "CLEAR_ERRORS",
    })


}