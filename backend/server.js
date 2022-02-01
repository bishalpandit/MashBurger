const express = require('express');
const connectDB = require('./config/db');
const foodItemRoutes = require('./routes/foodItemRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const dotenv = require('dotenv');
const cors = require('cors')
const chalk = require('chalk')
const path = require('path')
// Configs

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: '*'
}))

// Imported Routes
app.use(express.json())

app.use('/api/fooditems', foodItemRoutes); // Products API
app.use('/api/users', userRoutes);  // Users API
app.use('/api/orders', orderRoutes) // Orders API
app.use('/api/make-payment', paymentRoutes) // Payment API


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}



// Port and Listener


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(chalk.blue('Server running')));