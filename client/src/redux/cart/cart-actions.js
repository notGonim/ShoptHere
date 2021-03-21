import axios from 'axios'
import store from '../store'


export const addItemToCart = (id, quantity) => async (dispatch) => {
    const { data } = await axios.get(`/api/product/${id}`)
    dispatch({
        type: 'ADD_TO_CART',
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems',   JSON.stringify(store.getState().cart.cartItems))

}