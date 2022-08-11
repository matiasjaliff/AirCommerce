import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import s from '../styles/Cart.module.css';
import HistoryProduct from '../commons/HistoryProduct';

const History = () => {

  const [purchasedCartStorage, setPurchasedcartStorages] = useState([]);
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  const userStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/orders/purchase/${userStorage.id}`)
      .then(product => {
        console.log(product.data.product_buy);
         setPurchasedcartStorages(product.data)})
      .catch(error => console.log(error))
  }, [])


console.log(purchasedCartStorage);
  return (
    <div>
      <h1>Mis Orders</h1>

      <div className={s.productCard} key={purchasedCartStorage.barcode}>
        <div className={s.imageContainer}>
        {purchasedCartStorage.map((shoe) => {
          console.log(shoe.products_buy)
        return (
          <HistoryProduct shoe={shoe} key={shoe.id} />
        )
        }
          )}
        </div>
        
      </div>
    </div>
  )
}

export default History