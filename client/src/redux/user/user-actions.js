
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


// register func 
export const register = (userData) => async (dispatch) => {
    try {
        console.log(userData)
        dispatch({ type: "REGISTER_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/register', userData, config)
        console.log(data)
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: data.user
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: "REGISTER_FAIL",
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