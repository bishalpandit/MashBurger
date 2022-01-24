
export const foodItemListReducer = (state = { foodItems: [] }, action) => {

    switch (action.type) {
        case 'FOODITEM_LIST_REQUEST':
            return {
                loading: true,
                foodItems: []
            }
        case 'FOODITEM_LIST_SUCCESS':
            return {
                loading: false,
                foodItems: action.payload
            }
        case 'FOODITEM_LIST_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default: return state;
    }
}

export const foodItemDetailsReducer = (state = { foodItem: { review: [] } }, action) => {

    switch (action.type) {
        case 'FOODITEM_DETAILS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FOODITEM_DETAILS_SUCCESS':
            return {
                loading: false,
                foodItem: action.payload,
            }
        case 'FOODITEM_DETAILS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default: return state;
    }
}