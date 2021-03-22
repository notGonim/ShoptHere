
const INITIAL_STATE = {
    cartItems: []
}

const CartReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload
            const isItemExist = state.cartItems.find(i => i.product === item.product)
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }

        case 'REMOVE_ITEM_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

        default:
            return state;
    }
}

export default CartReducer