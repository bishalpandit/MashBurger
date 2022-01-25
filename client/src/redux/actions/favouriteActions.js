

export const addToFavourite = (foodItem) => async (dispatch, getState) => {
    // that whole thing inside dispatch is action object{type, payload..}
    dispatch({
        type: 'ADD_TO_FAVOURITE',
        payload: foodItem,
    })
    // Global State -> getState()
    localStorage.setItem('favourite', JSON.stringify(getState().favourite.items));
}

export const removeFromFavourite = (id) => async (dispatch, getState) => {
    // that whole thing inside dispatch is action object{type, payload..}
    dispatch({
        type: 'REMOVE_FROM_FAVOURITE',
        payload: id,
    })
    // Global State -> getState()
    localStorage.setItem('favourite', JSON.stringify(getState().favourite.items));
}