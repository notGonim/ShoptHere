
const INITIAL_STATE = {
    products: []
}

const ProductReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'ALL_PRODUCTS_REQUEST':
            return {
                loading: true,
                products: []
            };
        case 'ALL_PRODUCTS_SUCCESS':
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount,
                resPerPage:action.payload.resPerPage,
                filteredProductsCount:action.payload.filteredProductsCount
            };
        case 'ALL_PRODUCTS_FAIL':
            return {
                loading: false,
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

export default ProductReducer