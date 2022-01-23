import React, { useState } from 'react';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/userActions';
import { saveShippingAddress } from '../redux/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingScreen = ({ history }) => {
    const { shippingAddress } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [pinCode, setPinCode] = useState(shippingAddress.pinCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, pinCode, country }))
        history.push('/payment')
    }
    
    return (
        <Box maxWidth='xs'>
            <CheckoutSteps step1 step2 />
            <Container component='main' maxWidth='xs'>
                <Typography variant='h5' sx={{ textAlign: 'center', padding: '8px' }}>Shipping</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        onChange={(e) => setAddress(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Address"
                        name="address"
                        autoComplete="address"
                        defaultValue={address}
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setCity(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="city"
                        label="City"
                        defaultValue={city}
                        id="city"
                        autoComplete="city"
                    />
                    <TextField
                        onChange={(e) => setPinCode(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="pinCode"
                        defaultValue={pinCode}
                        label="PIN Code"
                        id="pinCode"
                        autoComplete="pinCode"
                    />
                    <TextField
                        onChange={(e) => setCountry(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="country"
                        defaultValue={country}
                        label="Country"
                        id="country"
                        autoComplete="current-country"
                    />
                    <Button variant='contained' type='submit'>
                        Continue
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default ShippingScreen
