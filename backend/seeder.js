const mongoose = require('mongoose')
const dotenv = require('dotenv')
const foodItems = require('./data/foodItems')
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
        const [ { _id: adminUser } ] = await User.find({ 'isAdmin': true }, '_id')
        console.log(adminUser);

        foodItemsModified = foodItems.map((item) => {
            return { ...item, user: adminUser }
        })

        await FoodItem.insertMany(foodItemsModified)
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