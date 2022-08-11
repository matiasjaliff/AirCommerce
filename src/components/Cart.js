import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shoes from '../utils/shoes.json';
import ProductCard from '../commons/ProductCard';
import s from '../styles/Cart.module.css';
import { useCartValue } from '../context/CartContext';
import { getTotal } from '../context/CartReducer';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


//// ALEATORIO LOGUEADO/DESLOGUEADO PARA PROBAR RUTA CHECKOUT
const logged = Math.random() < 0.5;

const Cart = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [{ cart }, dispatch] = useCartValue();

  return (
    <div className={s.cart}>
      <div className={s.cartItems}>
        {cart.map((shoe) => (
          <ProductCard shoe={shoe} key={shoe.id} />
        ))}
      </div>
      <div className={s.subtotal}>
        <div className={s.cuenta}>
          <h4>SUBTOTAL</h4>
          <ul>
            {cart.map((shoe) => (
              <li key={shoe.id}>
                {shoe.quantity} x {shoe.model}:<br />
                USD {Math.round(shoe.quantity * shoe.price)}
              </li>
            ))}
          </ul>
          <h5>USD {getTotal(cart)}</h5>
        </div>
        {isAuthenticated ? (
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        ) : (
          <div className={s.paragraph}>
            <p><Link to="/login">Logueate</Link> para continuar con el Checkout.</p>
            <p>Si no tenés usuario, te invitamos a <Link to='/signup'>registrarte</Link>.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
