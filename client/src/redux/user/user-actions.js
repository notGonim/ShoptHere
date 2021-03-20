
import axios from 'axios'


// login func 
export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: "LOGIN_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/login', { email, password }, config)
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: "LOGIN_FAIL",
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