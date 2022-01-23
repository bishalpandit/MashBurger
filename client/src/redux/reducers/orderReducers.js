import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
} from "../constants/orderConstants";


export const createOrderReducer = (state = {}, action) => {

    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: return state;
    }
}

export const getOrderReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {

    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case GET_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: return state;
    }
}

export const orderPayReducer = (state = {}, action) => {

    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default: return state;
    }
}