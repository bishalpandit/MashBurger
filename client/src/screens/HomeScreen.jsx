import React, { useEffect } from "react";
import FoodItem from "../components/FoodItem";
import { Grid, Alert, Skeleton } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { listFoodItems } from "../redux/actions/foodItemActions";

export default function HomeScreen() {

  const dispatch = useDispatch();

  const foodItemList = useSelector(state => state.foodItemList);
  const { loading, error, foodItems } = foodItemList


  useEffect(() => {
    dispatch(listFoodItems())
  }, [dispatch]);

  return (
    <>
      <h1 className="text-3xl font-semibold p-2">Your Food Corner</h1>
      {
        error ? (<Alert severity='error'>Something bad happened!</Alert>) :

          <Grid justifyContent="center" alignItems="center" container spacing={2} style={{ marginTop: '2rem' }}>
            {
              loading ?
                (Array.from(new Array(3)).map((item, index) => (
                  <Grid item key={index} sm={12} md={4} sx={{ width: 280 }}>
                    <Skeleton animation="wave" variant="rectangular" width={280} height={168} />
                    <Skeleton width='100%' />
                    <Skeleton width="60%" />
                  </Grid>
                )))
                :
                (foodItems.map((foodItem, index) => (
                  <Grid item key={index} sm={12} md={4} >
                    <FoodItem foodItem={foodItem} />
                  </Grid>
                )))
            }
          </Grid>
      }

    </>
  );
}

