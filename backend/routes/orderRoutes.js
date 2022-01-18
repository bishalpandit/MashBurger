const express = require('express')
const router = express.Router()
const { createOrder, getOrderDetails } = require('../controllers/orderControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createOrder)
router.route('/:id').get(getOrderDetails)

module.exports = router