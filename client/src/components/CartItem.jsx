import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions'

const CartItem = ({ cartItem }) => {

    const [qty, setQty] = useState(cartItem.qty)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addToCart({ ...cartItem, qty: qty }));
    }, [dispatch, qty, ])

    const addToCartHandler = () => {
        if (qty < 10) {
            setQty((prevCnt) => prevCnt + 1)
        }
    }

    const removeFromCartHandler = () => {
        if (qty > 1) {
            setQty((prevCnt) => prevCnt - 1)
        }
        else {
            dispatch(removeFromCart(cartItem.foodItemID))
        }
    }
    const baseImgURL = 'https://delfoody.blob.core.windows.net/images/static/'

    return (
        <div className='font-poppins !text-black flex bg-slate-100/75 py-6 px-6 space-x-4 min-w-max md:w-[600px] h-[120px]  rounded-xl'>
            <div className='p-2'>
                <img src={baseImgURL + cartItem.imgURL} className='h-16 w-20 rounded-xl' alt='fooditem' />
            </div>
            <div className='flex flex-col space-y-4 w-full'>
                <h4 className='text-base text-black/80 '>{cartItem.name}</h4>
                <div className='flex justify-between  px-2'>
                    <div className='font-semibold text-lg tracking-wide'>Rs {typeof cartItem.price === 'object' ? cartItem.price.small : cartItem.price}</div>
                    <div className='flex justify-evenly items-center w-28 h-10 rounded-2xl p-3 z-10 bg-white'>
                        <IconButton onClick={removeFromCartHandler}><RemoveIcon /></IconButton>
                        <span>{qty}</span>
                        <IconButton onClick={addToCartHandler}><AddIcon /></IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CartItem;
