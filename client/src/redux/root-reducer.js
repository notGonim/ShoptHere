import { combineReducers } from "redux";
import ProductReducer from "./products/product-reducer";


const rootReducer = combineReducers({
    products: ProductReducer
})



export default rootReducer
