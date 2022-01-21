const express = require('express')
const router = express.Router()
const { createOrder, getOrderDetails, updateOrderToPaid } = require('../controllers/orderControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createOrder)
router.route('/:id').get(protect, getOrderDetails)
router.route('/:id/pay').put(protect, updateOrderToPaid)

module.exports = router