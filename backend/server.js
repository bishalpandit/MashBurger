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
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./utils/passport');
// Configs

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: '*'
}))

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

// Imported Routes
app.use(express.json())

app.use('/api/fooditems', foodItemRoutes); // Products API
app.use('/api/users', userRoutes);  // Users API
app.use('/api/orders', orderRoutes) // Orders API
app.use('/api/make-payment', paymentRoutes) // Payment API

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);

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