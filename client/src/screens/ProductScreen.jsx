import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Alert, LinearProgress, Rating } from '@mui/material'
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import { listFoodItemDetails } from "../redux/actions/foodItemActions";

export default function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const baseImgURL = 'https://delfoody.blob.core.windows.net/images/static/'
  const foodItemDetails = useSelector((state) => state.foodItemDetails);
  const { loading, error, foodItem } = foodItemDetails;

  useEffect(() => {
    dispatch(listFoodItemDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
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
        <div className='flex flex-col md:flex-row p-3 items-center md:items-start justify-center md:justify-between  space-x-8'>

          <div className='basis-1/2 flex flex-col justify-center items-center md:items-start space-y-3 md:space-y-10'>
            <div className='border-2 rounded-lg shadow-md' >
              <img src={baseImgURL + foodItem.imgURL} alt={foodItem.name} />
            </div>
            <div className="font-poppins tracking-wide text-justify w-2/3">
              <h4>Description</h4>
              <p className="font-poppins tracking-wide text-justify">{foodItem.description}</p>
            </div >
          </div>

          <div className="basis-1/2 right-sec ">
            <h2 className="font-poppins text-3xl font-medium">{foodItem.name}</h2>
            <Rating name="read-only" value={foodItem.rating} readOnly />
          </div>

        </div>
      )}
    </div>
  );
}


{/* <Button
  onClick={addToCartHandler}
  className="btn-block"
  type="button"
  disabled={product.countInStock === 0}
>
  Add to Cart
</Button> */}


{/* <Form.Control
as="select"
value={qty}
onChange={(e) => setQty(e.target.value)}
>
{[...Array(product.countInStock).keys()].map((x) => (
  <option key={x + 1} value={x + 1}>
    {x + 1}
  </option>
))}
</Form.Control> */}