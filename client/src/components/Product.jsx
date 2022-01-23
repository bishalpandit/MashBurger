import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from '@mui/material'


export default function Product({ product: { _id, image, name, rating, numReviews, price } }) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/product/${_id}`} >
          <CardMedia
            component="img"
            height="100%"
            image={image}
            alt={name}
          />
        </Link>
        <CardContent>
          <Link to={`/product/${_id}`} style={{ textDecoration: 'none'}}>
            <Typography variant="h6" color="text.secondary" >
              {name}
            </Typography>
          </Link>
          <Rating
            value={rating}
            text={`${numReviews} reviews`}
          />
          <Typography variant="h6" color="text.primary">
           Rs {price}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}


{/* <Card className="my-3 p-3 rounded">
<Link to={`/product/${product._id}`}>
  <Card.Img src={product.image} variant="top" />
</Link>
<Card.Body>
  <Link to={`/product/${product._id}`}>
    <Card.Title as="div">
      <strong>{product.name}</strong>
    </Card.Title>
  </Link>
  <Card.Text as="div">
    <Rating
      value={product.rating}
      text={`${product.numReviews} reviews`}
    />
  </Card.Text>
  <Card.Text as="div">
    <h3>${product.price}</h3>
  </Card.Text>
</Card.Body>
</Card> */}