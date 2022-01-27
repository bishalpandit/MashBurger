import React, { useEffect, useState } from 'react';
import { useHistory, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { orderPay } from '../redux/actions/orderActions';

const SuccessScreen = ({ match }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [orderId, setOrderId] = useState('')
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    //const query = new URLSearchParams(location.search).get('redirect_status')
    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 8000)
    })
    return (
        <div>
            <h2>Your Payment is Succcesful!</h2>
            <p>Redirecting to orders page in 5s...</p>
        </div>
    )
};

export default SuccessScreen;
