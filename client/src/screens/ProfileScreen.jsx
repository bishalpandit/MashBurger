import React, { useState, useEffect } from 'react'
import { Avatar, Box, Container, Divider, Grid, Paper, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Stack, TextField, FormControlLabel } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateUserDetails } from '../redux/actions/userActions'
import Loader from '../components/Loader'

const ProfileScreen = ({ history, location }) => {

    const [toggleEdit, setToggleEdit] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState('profile')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, error } = userLogin

    const userData = useSelector(state => state.user)
    const { user, loading } = userData

    const dispatch = useDispatch()

    const handleUpdate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            name: data.get('name'),
            email: data.get('email'),
        }
        dispatch(updateUserDetails(userData))

    }


    useEffect(() => {
        dispatch(getUserDetails())
        if (!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history, dispatch])

    return (
        <Paper elevate={3} className>
            <Grid container spacing={1} sx={{ mt: 6 }} >
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <List sx={{ paddingLeft: 5 }}>
                        <ListItem disablePadding sx={{ bgcolor: 'gray' }}>
                            <ListItemButton >
                                <ListItemText primary="Menu" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setSelectedMenu('profile')} >

                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setSelectedMenu('orders')}>
                                <ListItemText primary="Orders" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={8}>
                    {
                        selectedMenu === 'profile' ?
                            <Box sx={{ padding: '10px 16px' }}>
                                <Typography variant='h4'>Profile Details</Typography>
                                {
                                    loading ? <Loader />
                                        :

                                        <Box spacing={4} sx={{ padding: '15px' }}>
                                            {!toggleEdit ?
                                                (<Stack spacing={5} sx={{ padding: '10px' }}>
                                                    <Typography variant='subtitle2'>Name : {user.name}</Typography>
                                                    <Typography variant='subtitle2'>Email : {user.email}</Typography>
                                                </Stack>)
                                                :
                                                (<Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="name"
                                                        defaultValue={user.name}
                                                        label="Name"
                                                        name="name"
                                                        autoFocus
                                                    />
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        defaultValue={user.email}
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoFocus
                                                    />
                                                    {/* <TextField
                                                    
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="current-password"
                                                    /> */}
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        sx={{ my: 2, mr: 4 }}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button variant='contained' onClick={() => setToggleEdit(false)}>Close</Button>
                                                </Box>)
                                            }
                                            <Divider sx={{ my: 2 }} />
                                            {!toggleEdit && <Button variant='contained' onClick={() => setToggleEdit(true)}>Edit</Button>}

                                        </Box>
                                }

                            </Box>
                            :
                            //Orders
                            <Typography variant='h4'>My Orders</Typography>
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProfileScreen
