import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Avatar, Button, Chip, LinearProgress, Rating, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { listFoodItemDetails } from "../redux/actions/foodItemActions";
import { addToCart } from "../redux/actions/cartActions";
import { addToFavourite } from '../redux/actions/favouriteActions'

export default function FoodItemScreen({ match, history }) {

  const dispatch = useDispatch();
  const baseImgURL = 'https://delfoody.blob.core.windows.net/images/static/'
  const foodItemDetails = useSelector((state) => state.foodItemDetails);
  const { loading, error, foodItem } = foodItemDetails;
  const { price, name, _id, imgURL } = foodItem
  const [selectPrice, setSelectPrice] = useState('small')


  const cartItem = {
    name,
    imgURL,
    foodItemID: _id,
    price: (typeof price === 'object') ? price[selectPrice] : price,
    qty: 1,
  } 


  useEffect(() => {
    dispatch(listFoodItemDetails(match.params.id));
  }, [match.params.id, dispatch]);

  const addToCartHandler = () => {
    
    //history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <div>
      {loading ? (
        <div className="h-[100vh] flex flex-col justify-center w-2/4 mx-auto " >
          <LinearProgress color="primary" />
        </div>
      ) : error ? (
        <Alert severity='info'>{error}</Alert>
      ) : (
        <div className='flex flex-col md:flex-row p-3 items-center md:items-start justify-center md:justify-between space-y-14 md:space-x-0  space-x-8'>
          <div className='basis-1/2 flex flex-col justify-center items-center md:items-start space-y-10 md:space-y-6'>
            <div className='border-2 rounded-lg shadow-md p-2 block' >
              <img className='object-cover' src={baseImgURL + foodItem.imgURL} alt={foodItem.name} />
            </div>
            <div className="font-poppins tracking-wide text-justify w-2/3 block">
              <h4>Description</h4>
              <p className="font-poppins tracking-wide text-justify">{foodItem.description}</p>
            </div >
          </div>

          <div className="basis-1/2 right-sec flex flex-col space-y-5">
            <h2 className="text-3xl text-black/75 font-medium font-alfa">{foodItem.name}</h2>
            <div className="flex space-x-12 items-center">
              <Chip className='!bg-orange-500/95 !text-white py-2 px-4' label={foodItem.category} />
              <Avatar variant="rounded" src={`/img/${foodItem.veg ? 'veg-food' : 'non-veg-food'}.svg`} className='!h-14 !w-14' />
            </div>

            <div className='flex space-x-2 text-orange-700'>
              <p className="text-lg font-medium">{foodItem.rating}</p>
              <Rating name="read-only" value={foodItem.rating} readOnly />
            </div>
            {
              typeof price === 'object' &&
              (
                <ToggleButtonGroup
                  className="!block "
                  value={selectPrice}
                  exclusive
                  onChange={(e, newPrice) => { setSelectPrice(newPrice) }}
                  aria-label="text alignment"
                >
                  {
                    Object.entries(price).map(([key, value]) => (
                      <ToggleButton key={key} value={key} aria-label={key}>
                        {key}
                      </ToggleButton>
                    ))
                  }
                </ToggleButtonGroup>
              )
            }

            <h4 className='text-orange-500 text-4xl font-poppins font-bold'>Rs {typeof price === 'object' ? price[selectPrice] : price}</h4>
            <div className='flex space-x-10'>
              <Button onClick={() => { dispatch(addToCart(cartItem)) }} variant="contained" className="!bg-emerald-500">Add to Cart</Button>
              <Button onClick={() => { dispatch(addToFavourite(foodItem)) }} variant="contained" className="!bg-rose-500">Add to Favorites</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


