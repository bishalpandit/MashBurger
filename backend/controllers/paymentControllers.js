const stripe = require('stripe')('sk_test_51KMC0ZSDc0LUOC6251V44MWWzEMY2rPnmGHOPdfercL6JkZhGIPpHdhU7gllyrR87H4jOGKeDZx0CGeuuBafyXV600Ve2WyTzw');
const ORDER = require('../models/orderModel')

const makePayment = async (req, res) => {
    const orderID = req.params.id;

    try {
        
        const { totalPrice } = await ORDER.findById(orderID)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice,
            currency: "inr",
            automatic_payment_methods: {
              enabled: true,
            },
          })
          console.log(paymentIntent.client_secret);
          res.json({
            clientSecret: paymentIntent.client_secret,
          });

    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

}

module.exports = { makePayment }