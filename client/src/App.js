import React from 'react';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import FoodItemScreen from './screens/FoodItemScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import SuccessScreen from './screens/SuccessScreen';


function App() {

  
  return (
    <Router>
      <NavBar  />
      <main className='py-6' >
        <div className='container px-4 mx-auto'>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/fooditem/:id' component={FoodItemScreen} />
          <Route path='/cart/' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/place-order' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/order/:id/success' component={SuccessScreen} />
        </div>
      </main>
    </Router>
  );
}

export default App;
