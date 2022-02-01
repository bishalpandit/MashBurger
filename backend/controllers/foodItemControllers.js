const asyncHandler = require("express-async-handler");
const FoodItem = require("../models/foodItemModel");

//@desc Get all foodItems
//@route GET /api/fooditems

const getFoodItems = asyncHandler( async(req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const foodItems = await FoodItem.find({ ...keyword });

    if(foodItems) {

        res.json(foodItems);
    }
    else {
        res.status(404).json('No data Found')
        throw new Error('No item found in DB')
    }
});

//@desc Get a single food Item i.e. Chicken Delight Pizza
//@route GET /api/fooditems/:id

const getFoodItemById = asyncHandler( async(req, res) => {
    const foodItem = await FoodItem.findById(req.params.id);

    if (foodItem) {
        res.json(foodItem);
    } else {
        throw new Error("Product not found");
    }
})

module.exports = {getFoodItems, getFoodItemById}

