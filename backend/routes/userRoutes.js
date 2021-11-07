const express = require('express')
const router = express.Router()
const { authUser } = require('../controllers/userControllers')

router.route('/login').post(authUser);

module.exports = router;