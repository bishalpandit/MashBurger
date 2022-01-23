import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from '../constants/productConstants'



export const productListReducer = (state = { foodItems: [] }, action) => {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                foodItems: []
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                foodItems: action.payload
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: return state;
    }
}

export const productDetailsReducer = (state = { product: { review: [] } }, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: return state;
    }
}