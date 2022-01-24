import axios from "axios";

export const listFoodItems = () => async (dispatch) => {
  try {
    dispatch({
      type: 'FOODITEM_LIST_REQUEST',
    })

    const { data } = await axios.get('/api/fooditems')
    console.log(data);
    dispatch({
      type: 'FOODITEM_LIST_SUCCESS',
      payload: data,
    })
    
  }
  catch (error) {

    dispatch({
      type: 'FOODITEM_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFoodItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'FOODITEM_DETAILS_REQUEST',
    })

    const { data } = await axios.get(`/api/fooditems/${id}`)

    dispatch({
      type: 'FOODITEM_DETAILS_SUCCESS',
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: 'FOODITEM_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
