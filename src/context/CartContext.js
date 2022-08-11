import { createContext, useContext, useReducer } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ reducer, initialState, children }) => (
  <CartContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CartContext.Provider>
);

export const useCartValue = () => useContext(CartContext);
