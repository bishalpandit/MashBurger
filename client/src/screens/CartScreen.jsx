import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert } from '@mui/material'
import { Row, Col, Image, ListGroup, Button, Form, Card, ListGroupItem } from "react-bootstrap"
import { addToCart, removeFromCart } from '../redux/actions/cartActions'
import CartItem from '../components/CartItem'

function CartScreen({ match, location, history }) {

    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;


    // useEffect(() => {
    //     if (productId) {
    //         dispatch(addToCart(productId, qty));
    //     }
    // }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const itemsTotal = cartItems.reduce((acc, item) => acc + item.price*item.qty, 0).toFixed(2)
    const shippingPrice = itemsTotal >= 500 ? 0 : 49

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <div>
            {
                !cartItems.length ?
                    (
                        <Alert className='mt-4' severity='info'>Your cart is empty. <Link to='/'>Go back</Link></Alert>
                    )
                    :
                    (
                        <div className='flex flex-col md:flex-row space-y-4 md:space-x-1 items-center md:justify-around md:items-start'>
                            <div className='flex flex-col space-y-6'>
                                {
                                    cartItems.map((item, idx) => (
                                        <CartItem key={idx} cartItem={item} />
                                    ))
                                }
                            </div>
                            <div className='font-poppins justify-center items-center text-white px-4 py-6 flex flex-col space-y-6 w-[280px] h-[300px] rounded-2xl border border-gray-400 bg-orange-400/90'>
                                <h2>Cart Details</h2>
                                <p>Items Total: Rs {itemsTotal}</p>
                                <p>Shipping Charge: Rs {shippingPrice}</p>
                                <p>Grand Total: Rs {itemsTotal + shippingPrice}</p>
                                <button onClick={checkOutHandler} className='w-32 h-20 rounded-3xl px-2 text-center py-2 shadow-sm text-black/75  bg-white'>Checkout</button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default CartScreen

//  <Row>
// <Col md={8}>
//     <h1>Shopping Cart</h1>
//     {cartItems.length === 0 ? <Alert severity='info'>Your cart is empty. <Link to='/'>Go back</Link></Alert> : (
//         <ListGroup variant='flush'>
//             {cartItems.map(item => (
//                 <ListGroup.Item key={item.product}>
//                     <Row>
//                         <Col md={2}>
//                             <Image src={item.image} alt={item.name} rounded fluid />
//                         </Col>
//                         <Col md={3}>
//                             <Link to={`/product/${item.product}`}>{item.name}</Link>
//                         </Col>
//                         <Col md={2}>${item.price}</Col>
//                         <Col md={2}>
//                             <Form.Control
//                                 as="select"
//                                 value={item.qty}
//                                 onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
//                             >
//                                 {[...Array(item.countInStock).keys()].map((x) => (
//                                     <option key={x + 1} value={x + 1}>
//                                         {x + 1}
//                                     </option>
//                                 ))}
//                             </Form.Control>
//                         </Col>
//                         <Col md={2}>
//                             <Button type='button' variant='light' onClick={
//                                 () => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
//                         </Col>
//                     </Row>
//                 </ListGroup.Item>
//             ))}
//         </ListGroup>
//     )}
// </Col>
// <Col md={4}>
//     <Card>
//         <ListGroup variant='flush' className='checkoutItem'>
//             <ListGroup.Item>
//                 <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty,0)} items</h2>
//                 <h5>Grand Total = ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h5>
//             </ListGroup.Item>
//             <ListGroup.Item>
//                 <Button type='button' className='btn-block' disabled={cartItems.lenght === 0}
//                 onClick={checkOutHandler}>Proceed to Checkout</Button>
//             </ListGroup.Item>
//         </ListGroup>
//     </Card>
// </Col>
// </Row> 