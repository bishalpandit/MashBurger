import React, { useEffect } from "react"
import { styled, alpha } from '@mui/material/styles'
import { Box, Typography, AppBar, Toolbar, IconButton, InputBase, Badge, Menu, MenuItem, } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/actions/userActions";
import { Link, useHistory } from 'react-router-dom'


export default function NavBar() {

  const history = useHistory()

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: 'white',
    padding: '5px',
    '&:hover': {
      color: 'white',
    }
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  // Handling Logout
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { cartItems } = useSelector(state => state.cart)
  const handleLogout = () => {
    dispatch(logout())
  }

  // AppBar Component Logic
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false)

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };



  const handleSearchToggle = () => {
    setSearchOpen(true)
  }

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to='/profile' underline="none">
        <MenuItem sx={{ textDecoration: 'none', color: 'black' }} onClick={() => { handleMenuClose(); }}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>LogOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const moveToCartHandler = () => {
    history.push('/cart')
  }

  const searchBarMobile = (
    <Search sx={{ display: 'flex', }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        size="large"
        edge="end"
        aria-label="close"
        aria-haspopup="true"
        color="inherit"
        onClick={() => { setSearchOpen(false) }}
        sx={{ marginX: '2px' }}
      >
        <CloseIcon />
      </IconButton>
    </Search>
  )

  return (
    <Box >
      <AppBar position="static" sx={{ backgroundColor: '#EA5C2B' }}>
        <Toolbar>

          {/* WebApp Name */}
          <StyledLink to='/' sx={{ fontSize: '1.7rem', marginRight: 2 }}>
            DelFoody
          </StyledLink>

          {
            searchOpen ?
              (<Box>
                {searchBarMobile}
              </Box>
              )
              :
              (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="search"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleSearchToggle}
                  color="inherit"
                  sx={{ marginRight: '4px' }}
                >
                  <SearchIcon />
                </IconButton>
              )
          }

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size="large"
            edge="end"
            aria-label="cart"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            color="inherit"
            sx={{ marginRight: '4px' }}
            onClick={moveToCartHandler}
          >
            {
              Boolean(cartItems.length) ?
                (
                  <StyledLink to='/cart'>
                    <Badge badgeContent={cartItems.length} color="secondary">
                      <ShoppingCartRoundedIcon />
                    </Badge>
                  </StyledLink>
                ) :
                (
                  <ShoppingCartRoundedIcon />
                )

            }

          </IconButton>

          {
            !userInfo ?
              (
                <Box>
                  <Box sx={{ display: { md: 'none' } }}>
                    <Link to='/login' underline='none'>
                      <LoginIcon sx={{ color: 'white', marginLeft: '6px' }} />
                    </Link>
                  </Box>

                  <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', padding: '4px', width: '200px', }}>
                    <StyledLink to='/register'>
                      <Typography sx={{ textDecoration: 'none', color: 'white' }}>Sign Up</Typography>
                    </StyledLink>
                    <StyledLink to='/login'>
                      <Typography sx={{ textDecoration: 'none', color: 'white' }}>Login</Typography>
                    </StyledLink>
                  </Box>
                </Box>

              ) :
              (
                <Box>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
              )
          }

        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box >
  )

}

