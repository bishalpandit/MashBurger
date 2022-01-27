import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, List, ListItem, Grid, Alert, ListItemText, Button, Container, Paper, Avatar, Link } from '@mui/material';
import { createOrder } from '../redux/actions/orderActions';
import { useHistory } from 'react-router-dom';

const PlaceOrderScreen = () => {

    const { shippingAddress: { address, city, pinCode, country }, cartItems, paymentMethod } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const history = useHistory()


    let itemsPrice = cartItems.reduce((acc, item) => { return acc + (item.price * item.qty) }, 0)
    const shippingPrice = (itemsPrice < 500) ? 49 : 0
    const total = (itemsPrice < 500) ? (itemsPrice + shippingPrice) : itemsPrice

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const baseImgURL = 'https://delfoody.blob.core.windows.net/images/static/'
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: { address, city, pinCode, country },
            paymentMethod: paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            totalPrice: total,
        }))
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [success, history, userInfo])

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
                                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                            Shipping
                                        </Typography>
                                        <Typography gutterBottom>{userInfo.name}</Typography>
                                        <Typography gutterBottom>{address + ', ' + city + ', ' + pinCode + ', ' + country}</Typography>
                                    </Grid>
                                    <Grid item container direction="column" xs={12} sm={6}>
                                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                            Payment details
                                        </Typography>
                                        <Typography>Payment Method: {paymentMethod[0].toUpperCase() + paymentMethod.substr(1)}</Typography>
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
