const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModel');
const stripe = require('stripe')(process.env.STRIPE_KEY);
//@desc create an order
//@route POST /api/order
//@access Protected

const createOrder = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length != 0) {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        })

        
        const createOrder = await order.save()

        res.status(201).json(createOrder)
    }
    else {
        res.status(400)
        throw new Error('No order items')
    }
});




//@desc get order by ID
//@route GET /api/orders/:id
//@access Protected

const getOrderDetails = asyncHandler(async (req, res) => {

    const orderID = req.params.id

    const order = await Order.findById(orderID).populate('user', 'name email')

    if (order) {
        res.json(order)

    }
    else {
        res.status(400)
        throw new Error('Order not found')
    }

});

//@desc update order to paid
//@route GET /api/orders/:id/pay
//@access Protected

const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)

    }
    else {
        res.status(400)
        throw new Error('Order not found')
    }

});



module.exports = {
    createOrder,
    getOrderDetails,
    updateOrderToPaid
}