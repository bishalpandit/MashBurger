import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const cartReducer = (prevState = { cartItems: [], shippingAddress: {}, paymentMethod: '' }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const newOrderItem = action.payload
            // foodItem is basically the id of that foodItem :>
            const existItem = prevState.cartItems.find(x => x.foodItemID === newOrderItem.foodItemID)
            if (existItem) {
                return {
                    ...prevState,
                    // just because when we change the **quantity of an existing item** we update its qty value...
                    cartItems: prevState.cartItems.map(x => x.foodItemID === existItem.foodItemID ? newOrderItem : x)
                }
            }
            else {
                return {
                    ...prevState,
                    cartItems: [...prevState.cartItems, newOrderItem],
                }
            }
            
        case CART_REMOVE_ITEM: 
            return {
                ...prevState,
                cartItems: prevState.cartItems.filter(item => item.foodItemID !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...prevState,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...prevState,
                paymentMethod: action.payload,
            }
        default:
            return prevState
    }
}