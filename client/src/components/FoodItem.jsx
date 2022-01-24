import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Skeleton, IconButton, Rating } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


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
                    {price.small + '-' + (price.large || price.medium) }
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
            <IconButton >
              <FavoriteBorderIcon className='!text-[#f43f5e]'/>
            </IconButton>
            <IconButton>
              <AddShoppingCartIcon className='text-teal-500' />
            </IconButton>
          </div>
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