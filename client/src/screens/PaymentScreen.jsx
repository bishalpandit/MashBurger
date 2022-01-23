import React, { useState } from 'react';
import { Box, Typography, Container, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
    const [paymentMethod, setPaymentMethod] = useState('')
    const { shippingAddress } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/place-order')
    }

    console.log(paymentMethod);
    const paymentMethodsList = ['paypal', 'stripe', 'paytm']
    return (
        <Box maxWidth='xs'>
            <CheckoutSteps step1 step2 step3 />
            <Container component='main' maxWidth='xs'>
                <Typography variant='h5' sx={{ textAlign: 'center', padding: '8px' }}>Payment</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="payment-method">Payment Method</InputLabel>
                        <Select
                            labelId="payment-method"
                            id="payment-method"
                            value={paymentMethod}
                            label="payment-method"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            {paymentMethodsList.map((item, index) =>
                                <MenuItem key={index} value={item}>{item[0].toUpperCase() + item.substr(1)}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Button variant='contained' sx={{ mt: 3 }} type='submit'>
                        Continue
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default PaymentScreen
