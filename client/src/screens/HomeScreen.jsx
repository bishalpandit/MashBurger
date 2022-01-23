import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Message from "../components/Message";
import Skeleton from "react-loading-skeleton";
import { Grid } from '@mui/material'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";

export default function HomeScreen() {

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, foodItems } = productList
  console.log(foodItems);
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  return (
    <>
      <h1>Your Food Corner</h1>
      {loading ? <> <Skeleton count={20} /></> : error ? <Message variant="danger" >{error}</Message> :

        <Grid container spacing={4} style={{marginTop: '2rem'}} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            foodItems.map((foodItem, index) => (
              <Grid item key={index} sm={12} md={4} >
                <Product foodItem={foodItem} />
              </Grid>
            ))
          }
        </Grid>
      }

    </>
  );
}

{/* <Row>
  {products.map((product) => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
  ))}
</Row> */}