import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../redux/actions/cartActions'
import { addToFavourite, removeFromFavourite } from "../redux/actions/favouriteActions";
import { Card, CardContent, CardMedia, Typography, IconButton, Rating } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Product({ foodItem: { _id, imgURL, name, rating, price } }) {


  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(_id, 1))
  }

  const foodItem = {
    _id, imgURL, name, rating, price
  }



  const favouriteItems = useSelector(state => state.favourite.items)
  
  let isFav = favouriteItems.find(item => item._id === _id)


  const FavouriteHandler = () => {
      isFav ? dispatch(removeFromFavourite(_id)) : dispatch(addToFavourite(foodItem))
  }


  const baseImgURL = 'https://delfoody.blob.core.windows.net/images/static/'
  return (
    <div>
      <Card sx={{ maxWidth: 280 }} >

        <Link to={`/product/${_id}`} >
          <CardMedia
            component="img"
            height="100%"
            image={baseImgURL + imgURL}
            alt={name}
            className='h-[60%] w-[80%]'
          />
        </Link>

        <CardContent>
          <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
            <Typography className='!text-black !font-medium !text-xl !font-poppins' >
              {name}
            </Typography>
          </Link>
          <Rating name="read-only" value={rating} readOnly />
          <Typography variant="h6" color="text.primary">
            Rs {price?.small ?
              (
                <div className="inline">
                  {price.small + '-' + (price.large || price.medium)}
                </div>
              )
              :
              (
                <div class='inline'>
                  {price}
                </div>
              )
            }
          </Typography>
          <div className='flex justify-around items-center'>
            <IconButton onClick={FavouriteHandler}>
              {
                isFav ?
                  (<FavoriteIcon className='!text-[#f43f5e]' />)
                  :
                  (<FavoriteBorderIcon className='!text-[#f43f5e]' />)
              }
            </IconButton>

            <IconButton onClick={addToCartHandler}>
              <AddShoppingCartIcon className='text-teal-500' />
            </IconButton>
          </div>
        </CardContent>

      </Card>
    </div>
  );
}

