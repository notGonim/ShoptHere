
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

// update func 
export const update = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PROFILE_REQUEST" })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/me/update', userData, config)
        console.log(data)
        dispatch({
            type: "UPDATE_PROFILE_SUCCESS",
            payload: data.success
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: "UPDATE_PROFILE_FAIL",
            payload: err.response.data.message
        })
    }
}


// loaduser  func 
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST" })


        const { data } = await axios.get('/api/me')
        dispatch({
            type: "LOAD_USER_SUCCESS",
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: "LOAD_USER_FAIL",
            payload: err.response.data.message
        })
    }
}



//handle user logout 
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/logout')
        dispatch({
            type: "LOGOUT_SUCCESS",
        })

    } catch (err) {
        dispatch({
            type: "LOGOUT_FAIL",
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


