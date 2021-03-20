


const INITIAL_STATE = {
    user: {}
}

const UserReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
            return {
                loading: true,
                isAuthenticated: false
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
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
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export default UserReducer