const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const dotenv = require('dotenv');

// Configs

dotenv.config();
connectDB();
const app = express();
app.use(express.json())
// Imported Routes

app.use('/api/products',productRoutes); // Products API
app.use('/api/users',userRoutes);  // Users API

// Port and Listener

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Server running'));