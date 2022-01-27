import React, { useEffect } from 'react'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, Alert, LinearProgress } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'
import { useHistory, useLocation } from 'react-router-dom'


const LoginScreen = () => {


    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const userInfoFromStore = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userInfoFromStore

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
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect])


    return (
        <Container component="main" maxWidth="xs">
            {error && <Alert severity='error'>Invalid Email or Password</Alert>}
            {loading ? (
                <div className="h-[100vh] flex flex-col justify-center w-2/4 mx-auto " >
                    <LinearProgress color="primary" />
                </div>
            )
                : (
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
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
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
                                {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>)}
        </Container>
    )
}


export default LoginScreen;
