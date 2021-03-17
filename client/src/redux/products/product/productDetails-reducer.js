
const INITIAL_STATE = {
    product: {}
}

const ProductDetailsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'PRODUCT_DETAILS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'PRODUCT_DETAILS_SUCCESS':
            return {
                loading: false,
                product: action.payload
            };
        case 'PRODUCT_DETAILS_FAIL':
            return {
                ...state,
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

export default ProductDetailsReducer