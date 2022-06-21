import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
} from "../constants/orderConstants"
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST,
        })


        const userData = JSON.parse(localStorage.getItem('userInfo'))
        const { token } = userData

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        console.log(order);
        const { data } = await axios.post(
            `/api/orders`,
            order,
            config
        )

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const getOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ORDER_REQUEST,
        })

        const { userLogin: { userInfo: { token } } } = getState()

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        
        
        const { data } = await axios.get(
            `/api/orders/${id}`,
            config
        )
        //console.log(data);
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: GET_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const orderPay = ({ orderId, paymentResult }) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const { userLogin: { userInfo: { token } } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        
        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}