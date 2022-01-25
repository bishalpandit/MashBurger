import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { foodItemDetailsReducer, foodItemListReducer } from './reducers/foodItemReducers.js'
import { cartReducer } from './reducers/cartReducers.js';
import { userLoginReducer, userDetailsReducer } from './reducers/userReducers.js';
import { createOrderReducer, getOrderReducer, orderPayReducer } from "./reducers/orderReducers";
import { FavouriteReducer } from './reducers/favouriteReducers'

const reducer = combineReducers({
    foodItemList: foodItemListReducer,
    foodItemDetails: foodItemDetailsReducer,
    favourite: FavouriteReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    user: userDetailsReducer,
    orderCreate: createOrderReducer,
    orderDetails: getOrderReducer,
    orderPay: orderPayReducer
});


const favouriteFromStorage = localStorage.getItem('favourite') ? JSON.parse(
    localStorage.getItem('favourite')) : []

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(
    localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
    localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(
    localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(
    localStorage.getItem('paymentMethod')) : ''



const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    },
    favourite: {
        items: favouriteFromStorage
    }
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
