import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, List, ListItem, Grid, Alert, ListItemText, Button, Container, Paper, Avatar } from '@mui/material';
import { createOrder } from '../redux/actions/orderActions';
import { useHistory } from 'react-router-dom';
import baseImgURL from '../utils/baseImgURL';

const PlaceOrderScreen = () => {

    const { shippingAddress, cartItems, paymentMethod } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const history = useHistory()


    const itemsPrice = cartItems.reduce((acc, item) => { return acc + (item.price * item.qty) }, 0)
    const shippingPrice = (itemsPrice < 500) ? 49 : 0
    const total = (itemsPrice < 500) ? (itemsPrice + shippingPrice) : itemsPrice

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const placeOrderHandler = () => {

        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: 'Stripe',
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            totalPrice: total,
        }))
    }
    const orderId = order?._id

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if(Object.keys(shippingAddress).length === 0 || !cartItems.length ) {
            history.push('/')
        }
        if (success) {
            history.push(`/order/${orderId}`)
        }
    }, [success, history, userInfo, orderId, shippingAddress, cartItems])

    return (
        <div className='!font-poppins'>

            {
                userInfo && (

                    <Container className='!font-poppins' component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        {error &&
                            <Alert severity='error'>Order Placement Failed</Alert>
                        }

                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                    Order Summary
                                </Typography>
                                <List disablePadding>
                                    {!cartItems.length ?
                                        (<Alert severity='info'>Your cart is empty</Alert>)
                                        :
                                        cartItems.map((item) => (
                                            <div key={item.foodItemID} className='flex justify-between py-2 px-4'>
                                                <Avatar src={baseImgURL + item.imgURL} variant='square' />
                                                <h4 className='text-base text-black/80 '>{item.name}</h4>
                                                <h4 className='text-base text-black/80 '>{item.qty} x Rs {item.price}</h4>
                                            </div>
                                        ))}

                                    <ListItem sx={{ py: 1, px: 0 }}>
                                        <ListItemText primary="Items Price" />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Rs {itemsPrice.toFixed(2)}
                                        </Typography>
                                    </ListItem>
                                    <ListItem sx={{ py: 1, px: 0 }}>
                                        <ListItemText primary="Shipping Price" />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Rs {shippingPrice}
                                        </Typography>
                                    </ListItem>
                                    <ListItem sx={{ py: 1, px: 0 }}>
                                        <ListItemText primary="Total" />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Rs {total.toFixed(2)}
                                        </Typography>
                                    </ListItem>
                                </List>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className='!font-poppins' variant="h6" gutterBottom sx={{ mt: 2 }}>
                                            Shipping
                                        </Typography>
                                        <Typography gutterBottom>{userInfo.name}</Typography>
                                        <Typography gutterBottom>{shippingAddress.address + ', ' + shippingAddress.city + ', ' + shippingAddress.pinCode + ', ' + shippingAddress.country}</Typography>
                                    </Grid>
                                    <Grid item container direction="column" xs={12} sm={6}>
                                        <Typography className='!font-poppins' variant="h6" gutterBottom sx={{ mt: 2 }}>
                                            Payment details
                                        </Typography>
                                        <Typography className='!font-poppins'>Payment Method: Stripe</Typography>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                            <Button sx={{ mt: 2 }} onClick={placeOrderHandler} variant='contained'>Place Order</Button>
                        </Paper>
                    </Container>
                )
            }



        </div>
    )
}

export default PlaceOrderScreen
