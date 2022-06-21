import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Alert } from '@mui/material'

import { addToCart, removeFromCart } from '../redux/actions/cartActions'
import CartItem from '../components/CartItem'

function CartScreen() {

    const history = useHistory()

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    const shippingPrice = itemsTotal >= 500 ? 0 : 49

    const checkOutHandler = () => {
        if (userInfo) {
            history.push('/shipping')
        }
        else {
            history.push('/login')
        }
    }

    return (
        <div>
            {
                !cartItems.length ?
                    (
                        <Alert className='mt-4' severity='info'>Your cart is empty. <Link to='/'>Go back</Link></Alert>
                    )
                    :
                    (
                        <div className='flex flex-col md:flex-row space-y-4 md:space-x-1 items-center md:justify-around md:items-start'>
                            <div className='flex flex-col space-y-6'>
                                {
                                    cartItems.map((item, idx) => (
                                        <CartItem key={idx} cartItem={item} />
                                    ))
                                }
                            </div>
                            <div className='font-poppins justify-center items-center text-white px-4 py-6 flex flex-col space-y-6 w-[280px] h-[300px] rounded-2xl border border-gray-400 bg-orange-400/90'>
                                <h2>Cart Details</h2>
                                <p>Items Total: Rs {itemsTotal}</p>
                                <p>Shipping Charge: Rs {shippingPrice}</p>
                                <p>Grand Total: Rs {itemsTotal + shippingPrice}</p>
                                <button onClick={checkOutHandler} className='w-32 h-20 rounded-3xl px-2 text-center py-2 shadow-sm text-black/75  bg-white'>Checkout</button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default CartScreen
