


const INITIAL_STATE = {
    user: {}
}

const UserReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
        case 'LOAD_USER_REQUEST':
            return {
                loading: true,
                isAuthenticated: false
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
        case 'LOAD_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case 'LOGOUT_FAIL':
            return {
                ...state,
                error: action.payload
            };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':

            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case 'LOGOUT_SUCCESS':
            return {
                loading: false,
                isAuthenticated: false,
                user: null

            };
        case 'LOAD_USER_FAIL':
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload

            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const ProfileReducer = (state = {}, action) => {

    switch (action.type) {

        case 'UPDATE_PROFILE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'UPDATE_PROFILE_SUCCESS':
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case 'UPDATE_PROFILE_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'UPDATE_PROFILE_RESET':
            return {
                ...state,
                isUpdated: false
            };
        default:
            return state;
    }
}



export default UserReducer