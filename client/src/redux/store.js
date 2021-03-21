import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";


const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;





let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
    
}

const middlewares = [thunk]

const store = createStore(rootReducer, initialState, composeEnchancer(applyMiddleware(...middlewares)))




export default store
