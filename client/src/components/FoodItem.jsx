import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Skeleton } from '@mui/material'


export default function Product({ foodItem: { _id, imgURL, name, rating, price } }) {

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
          />
        </Link>

        <CardContent>
          <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
            <Typography style={{ fontSize: '1.5rem', color: 'black' }} >
              {name}
            </Typography>
          </Link>
          <Typography variant="h6" color="text.primary">
            Rs {price?.small || price}
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