import React from 'react';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
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


function App() {
  return (
    <Router>
      <NavBar  />
      <main className="py-3" >
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/fooditem/:id' component={FoodItemScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/place-order' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
