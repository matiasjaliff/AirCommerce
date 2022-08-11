import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AuthContextProvider from './context/AuthContext';
import { CartContextProvider } from './context/CartContext';
import reducer, { initialState } from './context/CartReducer';

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <CartContextProvider initialState={initialState} reducer={reducer}>
        <App />
      </CartContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,

  document.getElementById('root')
);
