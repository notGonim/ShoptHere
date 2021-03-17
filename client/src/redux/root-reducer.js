import { combineReducers } from "redux";
import ProductReducer from "./products/product-reducer";
import ProductDetailsReducer from "./products/product/productDetails-reducer";


const rootReducer = combineReducers({
    products: ProductReducer,
    product: ProductDetailsReducer
})



export default rootReducer
