const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./data/users')
const products = require('./data/products')
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {

    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(p => {
            return { ...p, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log('Data imported!')
        process.exit()
    } catch (error) {

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