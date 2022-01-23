import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps';
import { Typography, List, ListItem, Grid, ListItemText, Button, Container, Paper, Avatar, Link } from '@mui/material';
import Message from '../components/Message';
import { createOrder } from '../redux/actions/orderActions';

const PlaceOrderScreen = ({ history }) => {

    const { shippingAddress: { address, city, pinCode, country }, cartItems, paymentMethod } = useSelector(state => state.cart)
    const { userInfo: { name } } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()



    let itemsPrice = cartItems.reduce((acc, item) => { return acc + (item.price * item.qty) }, 0)
    const shippingPrice = (itemsPrice < 500) ? 40 : 0
    const total = (itemsPrice < 500) ? (itemsPrice + shippingPrice) : itemsPrice
    
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    
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
        if(success) {
            history.push(`/order/${order._id}`)
        }
    }, [success])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                {error &&
                <Message>Order Placement Failed</Message>   
            }

                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Order summary
                        </Typography>
                        <List disablePadding>
                            {!cartItems.length ?
                                (<Message>Your cart is empty</Message>)
                                :
                                cartItems.map((product) => (
                                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                                        <Avatar sx={{ m: 1 }} src={product.image} variant='square'></Avatar>
                                        <ListItemText primary={product.name} secondary={product.description} />
                                        <Typography variant="body1">{`${product.qty}x $ ${product.price}`}</Typography>
                                    </ListItem>
                                ))}

                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Items Price" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    $ {itemsPrice.toFixed(2)}
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Shipping Price" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    $ {shippingPrice}
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Total" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    $ {total.toFixed(2)}
                                </Typography>
                            </ListItem>
                        </List>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                    Shipping
                                </Typography>
                                <Typography gutterBottom>{name}</Typography>
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


        </div>
    )
}

export default PlaceOrderScreen
