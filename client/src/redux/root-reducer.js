import { combineReducers } from "redux";
import CartReducer from "./cart/cart-reducer";
import ProductReducer from "./products/product-reducer";
import ProductDetailsReducer from "./products/product/productDetails-reducer";
import UserReducer, { ProfileReducer } from "./user/user-reducer";


const rootReducer = combineReducers({
    products: ProductReducer,
    product: ProductDetailsReducer,
    auth: UserReducer,
    profile: ProfileReducer,
    cart:CartReducer
})



export default rootReducer
