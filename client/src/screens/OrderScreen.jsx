import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader';
import { Typography, Modal, List, ListItem, Grid, ListItemText, Button, Alert, Container, Paper, Avatar, Link, Box } from '@mui/material'
import { getOrder, orderPay } from '../redux/actions/orderActions';
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants';
import baseImgURL from '../utils/baseImgURL'
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51KMC0ZSDc0LUOC62V43R2FBqSWR7uDUjd5oCZiASr03bwBAlEVQfW4VEJzfUILRbLS9AJGbPdFf3ihqcGtvHj3M800WpO3Gzrh')

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px'
};

const OrderScreen = ({ match }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()
    const [clientSecret, setClientSecret] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        dispatch(getOrder(orderId))
        const createPaymentIntent = async () => {
            const userData = JSON.parse(localStorage.getItem('userInfo'))
            const { token } = userData

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.post(`/api/make-payment/${orderId}`, order, config)

            setClientSecret(data.clientSecret);
        }

        createPaymentIntent()
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(orderPay({ paymentResult, orderId }))
    }

    return (

        loading ? <Loader /> : error ? <Alert severity='error'>{error}</Alert> :
            (
                <Container component="main" className='!rounded-lg' maxWidth="sm" sx={{ mb: 4 }}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className='max-w-xs md:min-w-max' sx={style}>
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm orderId={orderId}/>
                            </Elements>
                        </Box>
                    </Modal>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                        <Typography variant="h6" gutterBottom>
                            Order Details : {order._id}
                        </Typography>

                        <List disablePadding>
                            {
                                order?.orderItems?.length === 0 ?
                                    <Alert severity='info'>Cart is Empty</Alert> :
                                    order?.orderItems?.map((item, index) => (
                                        <div key={item.foodItemID} className='flex justify-between py-2 px-4'>
                                            <Avatar src={baseImgURL + item.imgURL} variant='square' />
                                            <h4 className='text-base text-black/80 '>{item.name}</h4>
                                            <h4 className='text-base text-black/80 '>{item.qty} x Rs {item.price}</h4>
                                        </div>
                                    ))}

                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Shipping Price" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    Rs {order?.shippingPrice}
                                </Typography>
                            </ListItem>

                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Total" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    Rs {order?.totalPrice}
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
                                <Typography><strong>Payment Status</strong>: {order.isPaid ? 'Paid' : 'Not Paid'}</Typography>
                                {
                                    clientSecret && (
                                        <Button variant='contained' className='mt-4' onClick={handleOpen}>Make Payment</Button>
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

