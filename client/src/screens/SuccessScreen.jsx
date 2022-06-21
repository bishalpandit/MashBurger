import React, { useEffect, useState } from 'react';
import { useHistory, } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { orderPay } from '../redux/actions/orderActions';
import { clearCart } from '../redux/actions/cartActions';

const SuccessScreen = ({ match, location }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const orderId = match.params.id;
    const paymentIntentId = new URLSearchParams(location.search).get('payment_intent');
    console.log(paymentIntentId);

    useEffect(() => {
        dispatch(orderPay({ orderId, paymentIntentId }));
        dispatch(clearCart());
        setTimeout(() => {
            history.push(`/order/${orderId}`);
        }, 5000);
    }, []);

    return (
        <div className='flex flex-col h-screen w-full justify-center items-center'>
            <div className="bg-white p-6  md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                    <p className="text-gray-600 my-2">Thank you for completing your online payment.</p>
                    <p> Redirecting to orders page in 5 secs </p>
                    <div className="py-10 text-center">
                        <a href={`/order/${orderId}`} className="px-12 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3">
                            Go Back
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SuccessScreen;
