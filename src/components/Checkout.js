import React from 'react';
import '../styles/Checkout.module.css';
import * as FaIcons from 'react-icons/fa';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { checkOut } from '../hooks/Alerts'
import { useCartValue } from '../context/CartContext';
import emailjs from "emailjs-com";

const Checkout = () => {
  const cart = useCartValue()
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const cartStorage = JSON.parse(localStorage.getItem("cart"));

  


  const handleCheckout = async (e) => {
    e.preventDefault();

    const checkoutEmail = (() => {

      let templateParams = {
        to_name: `${userStorage.name}`,
        from_name: "AirCommerce",
        message: `¡Felicitaciones ${userStorage.name}! Su compra se ha realizado con exito.`,
        mail: `${userStorage.email}`
      };
  
      emailjs.send("service_5a88wkc", "template_q1vr3wt", templateParams, "JvDpm9VoxM-RndTxc").then((result) => {
        console.log("exito", result);
      }, (error) => {
        console.log("NO! por qué?!!", error);
      })
    });

    try {

      const checkout = await axios.put('/orders/checkout', {
        products_buy: cartStorage,
        userNumber: userStorage.id,
      });
      const newOrder = await axios.post('/orders/add', {
        orderNumber: null,
        products_buy: [],
        price_final: 0,
        userNumber: userStorage.id,
        fullfilled: false,
        rejected: false,
      });

      localStorage.removeItem('cart');
      checkOut()
      checkoutEmail()
      navigate('/history')
      
      
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div className="row">
      <div className="col-75">
        <div className="container">
          <form onSubmit={handleCheckout}>
            <div className="row">
              <div className="col-50">
                <h3>Billing Address</h3>
                <label for="fname">
                  <i></i> Full Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="Pepe Argento"
                />
                <label for="email">
                  <i></i> Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="pepe@example.com"
                />
                <label for="adr">
                  <i></i> Address
                </label>
                <input
                  type="text"
                  id="adr"
                  name="address"
                  placeholder="Aldolfo Alsina 2256"
                />
                <label for="city">
                  <i></i> City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Buenos Aires"
                />

                <div className="row">
                  <div className="col-50">
                    <label for="state">Country</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Argentina"
                    />
                  </div>
                  <div className="col-50">
                    <label for="zip_code">Zip</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              <div className="col-50">
                <h3>Payment</h3>
                <label for="fname">Accepted Cards</label>
                <div className="icon-container">
                  <i>
                    {' '}
                    <FaIcons.FaCcVisa />{' '}
                  </i>
                  <i>
                    {' '}
                    <FaIcons.FaCcMastercard />{' '}
                  </i>
                  <i>
                    {' '}
                    <FaIcons.FaCcDiscover />{' '}
                  </i>
                  <i>
                    {' '}
                    <FaIcons.FaCreditCard />{' '}
                  </i>
                </div>
                <label for="cname">Name on Card</label>
                <input
                  type="text"
                  id="cname"
                  name="cardname"
                  placeholder="Pepe Argento"
                />
                <label for="ccnum">Credit card number</label>
                <input
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                  placeholder="1111-2222-3333-4444"
                />
                <label for="expmonth">Exp Month</label>
                <input
                  type="text"
                  id="expmonth"
                  name="expmonth"
                  placeholder="September"
                />
                <div className="row">
                  <div className="col-50">
                    <label for="expyear">Exp Year</label>
                    <input
                      type="text"
                      id="expyear"
                      name="expyear"
                      placeholder="2024"
                    />
                  </div>
                  <div className="col-50">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" placeholder="352" />
                  </div>
                </div>
              </div>
            </div>
            <label>
              <input type="checkbox" checked="checked" name="sameadr" />{' '}
              Shipping address same as billing
            </label>
            <input type="submit" value="Continue to checkout" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout
