import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import { orange } from '@mui/material/colors'

const theme = createTheme({
  status: {
    danger: orange[500]
  }
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);


