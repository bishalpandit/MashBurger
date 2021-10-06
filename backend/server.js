const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')
const dotenv = require('dotenv');

// Configs

dotenv.config();
connectDB();
const app = express();

// Imported Routes

app.use('/api/products',productRoutes);
app.use('/api/product/:id',productRoutes);

// Port and Listener

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Server running'));