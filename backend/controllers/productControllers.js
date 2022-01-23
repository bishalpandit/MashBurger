const asyncHandler = require("express-async-handler");
const FoodItem = require("../models/foodItemModel");

//@desc Fetch all products
//@route GET /api/products

const getProducts = asyncHandler( async(req, res) => {
    const foodItems = await FoodItem.find({});

    res.json(foodItems);
});

//@desc Fetch single product
//@route GET /api/products/:id

const getProductById = asyncHandler( async(req, res) => {
    const product = await FoodItem.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        throw new Error("Product not found");
    }
})

module.exports = {getProducts, getProductById}

