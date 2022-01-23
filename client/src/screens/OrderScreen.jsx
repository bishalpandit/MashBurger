import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader';
import { Typography, List, ListItem, Grid, ListItemText, Button, Container, Paper, Avatar, Link, Box } from '@mui/material';
import Message from '../components/Message';
import { getOrder, orderPay } from '../redux/actions/orderActions';
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants';

const OrderScreen = ({ match }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)

    useEffect(() => {

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=sb&&currency=INR`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }



        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrder(orderId))
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            }
        }
    }, [order, orderId, dispatch, successPay])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(orderPay({ paymentResult, orderId }))
    }

    return (

        loading ? <Loader /> : error ? <Message>{error}</Message> :
            (
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                        <Typography variant="h6" gutterBottom>
                            Order Details : {order._id}
                        </Typography>

                        <List disablePadding>
                            {
                                order?.orderItems?.length === 0 ?
                                    <Message>Cart is Empty</Message> :
                                    order?.orderItems?.map((product, index) => (
                                        <ListItem key={index} sx={{ py: 1, px: 0 }}>
                                            <Avatar sx={{ m: 1 }} src={product.image} variant='square'></Avatar>
                                            <ListItemText primary={product.name} secondary={product.description} />
                                            <Typography variant="body1">{`${product.qty}x $ ${product.price}`}</Typography>
                                        </ListItem>
                                    ))}

                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Shipping Price" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    $ {order?.shippingPrice}
                                </Typography>
                            </ListItem>

                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Total" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    $ {order?.totalPrice}
                                </Typography>
                            </ListItem>

                        </List>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                    Shipping Details
                                </Typography>
                                <Typography gutterBottom>{order.user.name}</Typography>
                                <Typography gutterBottom>{order.user.email}</Typography>
                                <Typography gutterBottom>{order.shippingAddress.address + ', ' + order.shippingAddress.city + ', ' + order.shippingAddress.pinCode + ', ' + order.shippingAddress.country}</Typography>
                                <Typography><strong>Delivery Status</strong>: {order.isDeliverd ? 'Delivered' : 'Not Delivered'}</Typography>
                            </Grid>

                            <Grid item container direction="column" xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                    Payment details
                                </Typography>
                                <Typography>Payment Method: {order?.paymentMethod}</Typography>
                                <Typography><strong>Payment Status</strong>: {order.isPaid ? 'Paid' : 'Not Paid'}</Typography>
                                {
                                    !order.isPaid && (
                                        <List>
                                            <ListItem>
                                                {loadingPay && <Loader />}
                                                {!sdkReady ? <Loader /> : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                        
                                                    />
                                                )}
                                            </ListItem>
                                        </List>
                                    )
                                }
                            </Grid>

                        </Grid>


                    </Paper>
                </Container>
            )
    )
}

export default OrderScreen

