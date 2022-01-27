const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const dotenv = require('dotenv');
const cors = require('cors')

// Configs

dotenv.config();
connectDB();
const app = express();
app.use(express.json())
// Imported Routes

app.use('/api/fooditems', productRoutes); // Products API
app.use('/api/users', userRoutes);  // Users API
app.use('/api/orders', orderRoutes) // Orders API
app.use('/api/make-payment', paymentRoutes) // Payment API


// Port and Listener


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Server running'));