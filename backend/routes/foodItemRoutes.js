const express = require('express')
const router = express.Router()
const { getFoodItems, getFoodItemById } = require('../controllers/foodItemControllers')

router.route('/').get(getFoodItems);
router.route('/:id').get(getFoodItemById);

module.exports = router