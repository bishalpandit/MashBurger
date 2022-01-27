const express = require('express')
const router = express.Router()
const { makePayment } = require('../controllers/paymentControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/:id').post(protect, makePayment)

module.exports = router