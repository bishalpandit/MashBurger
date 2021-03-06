import axios from "axios";
import { CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CLEAR_CART } from "../constants/cartConstants";

export const addToCart = (foodItem) => async (dispatch, getState) => {

    //Returning an orderItem object(payload) to save in cart array
    dispatch({
        type: 'CART_ADD_ITEM',
        payload: foodItem,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const clearCart = () => (dispatch, getState) => {
    dispatch({
        type: CLEAR_CART
    })
    
    localStorage.removeItem('cartItems');
}

export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

