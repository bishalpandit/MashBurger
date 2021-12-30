const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, registerUser, updateUserProfile } = require('../controllers/userControllers')
const {protect} = require('../middleware/authMiddleware.js')

router.route('/login').post(authUser);
router.route('/register').post(registerUser);
router.route('/:id').get(protect, getUserProfile).put(protect, updateUserProfile)
module.exports = router;