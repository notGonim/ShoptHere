import { combineReducers } from "redux";
import ProductReducer from "./products/product-reducer";
import ProductDetailsReducer from "./products/product/productDetails-reducer";
import UserReducer from "./user/user-reducer";


const rootReducer = combineReducers({
    products: ProductReducer,
    product: ProductDetailsReducer,
    auth: UserReducer
})



export default rootReducer
