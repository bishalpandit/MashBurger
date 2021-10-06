const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const router = express.Router()

//@desc Fetch all products
//@route GET /api/products
//@access PUBLIC

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    /* res.status(401)
    throw new Error("Not Authorized") */
    let data = res.json(products);
}))

//@desc Fetch single product
//@route GET /api/products/:id
//@access PUBLIC

router.get('/:id', asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: 'Product not found' })
    }

}))

module.exports = router