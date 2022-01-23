const mongoose = require('mongoose')
const dotenv = require('dotenv')
const foodItems = require('./data/products')
const User = require('./models/userModel')
const FoodItem = require('./models/foodItemModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {

    try {
        //await Order.deleteMany()
        //await Product.deleteMany()
        //await User.deleteMany()

        //const createdUsers = await User.insertMany(users)

        //const adminUser = createdUsers[0]._id

        await FoodItem.insertMany(sampleProducts)
        console.log('Data imported!')
        process.exit()
    } catch (error) {
        console.log(error);
    }
}

const destroyData = async () => {

    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed!')
    } catch (error) {

    }
}

if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData()
}