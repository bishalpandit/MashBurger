import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";

export default function HomeScreen() {

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  return (
    <>
      <h1>Your Pizza Corner</h1>
      {loading ? <> <Skeleton count={20} /></> : error ? <Message variant="danger" >{error}</Message> :
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      }

    </>
  );
}

