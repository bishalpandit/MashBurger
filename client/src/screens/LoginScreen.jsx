import React, { useState, useEffect } from 'react'
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Alert} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'
import Loader from "../components/Loader"

const theme = createTheme();

const LoginScreen = ({ location, history }) => {
    
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')

    const dispatch = useDispatch()

    const userInfoFromStore = useSelector(state => state.userLogin)
    const { userInfo , loading, error } = userInfoFromStore
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        }
        dispatch(login(userData))
    }

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
             history.push(redirect);
        }
    }, [userInfo, history, redirect])


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {error && <Alert severity='error'>Invalid Email or Password</Alert>}
                {loading ? <Loader /> : (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>) }
            </Container>
        </ThemeProvider>
    )
}


export default LoginScreen;
