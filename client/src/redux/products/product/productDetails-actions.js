import axios from 'axios'


// getting all products from the   ---> api/products
export const getProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({
            type: "PRODUCT_DETAILS_REQUEST",
        })
        
        const { data } = await axios.get(`/api/product/${id}`)
        console.log(data)
        dispatch({
            type: "PRODUCT_DETAILS_SUCCESS",
            payload: data.product
        })
    } catch (err) {
        dispatch({
            type: "PRODUCT_DETAILS_FAIL",
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