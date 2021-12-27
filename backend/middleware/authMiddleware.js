const jwt = require('jsonwebtoken')
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token //= req.headers.authorization.split(' ')[1]

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            let token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized no token')
        }
    }
    next()
})

module.exports = {
    protect
}