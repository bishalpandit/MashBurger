const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const sizeSchema = mongoose.Schema({
    small: 'small',
    medium: 'medium',
    large: 'large',
    default: 'normal'
})

const priceSchema = mongoose.Schema({
    normal: Number,
    special: {
        small: Number,
        medium: Number,
        big: Number
    }

})
const foodItemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: priceSchema,
    veg: {
        type: Boolean,
        required: true,
    },
    size: sizeSchema ,
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    available: {
        type: Boolean,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const FoodItem = mongoose.model('FoodItem', foodItemSchema)

module.exports = FoodItem