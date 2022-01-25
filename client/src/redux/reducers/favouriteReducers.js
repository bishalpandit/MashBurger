export const FavouriteReducer = (prevState = { items: [] }, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVOURITE':
            const newItem = action.payload
            const hasItem = prevState.items.find((item) => item === newItem)
            if (!hasItem) {
                return {
                    items: [...prevState.items, newItem]
                }
            }
            else {
                return prevState
            }
        case 'REMOVE_FROM_FAVOURITE':
            const id = action.payload
            const filteredItems = prevState.items.filter(item => item._id !== id)
            return {
                items: filteredItems
            }
        default:
            return prevState
    }
}
// prev: [1,2,3]

// [...prev, 4]

// [1,2,3,4]