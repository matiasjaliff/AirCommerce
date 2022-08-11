import React from 'react';
import { BsFillChatTextFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import s from '../styles/HistoryProduct.module.css';



const HistoryProduct = ({ shoe }) => {
  console.log(shoe)
  return (
    <div className={s.productCard} key={shoe.barcode}>
      <div className={s.imageContainer}>
        <Link to={`/${shoe.id}`}>
          <img
            className={s.image}
            src={require(`../utils/img${shoe.url_path}`)}
            alt={shoe.model}
          />
        </Link>
      </div>
      <div className={s.details}>
        <ul>
          <li>Marca: {shoe.brand}</li>
          <li>Modelo: {shoe.model}</li>
          <li>Talle: {shoe.size}</li>
          <li>Cantidad: {shoe.quantity}</li>
          <li>Precio: USD {Math.round(shoe.price)}</li>
        </ul>
        <div className={s.cantidad}>
        </div>
        <div className={s.trash}>
          <p>
            <BsFillChatTextFill/>
          </p>
        </div>
      </div>
    </div>
  )
}

export default HistoryProduct