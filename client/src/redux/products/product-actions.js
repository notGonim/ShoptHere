import axios from 'axios'


// getting all products from the   ---> api/products
export const getProducts = (keyword = '', currPage = 1, price) => async (dispatch) => {

    try {
        dispatch({
            type: "ALL_PRODUCTS_REQUEST",
        })
        let link = `/api/products?keyword=${keyword}&page=${currPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        const { data } = await axios.get(link)
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