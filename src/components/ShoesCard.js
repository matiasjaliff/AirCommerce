import React from 'react';
import { Link } from 'react-router-dom';
import s from '../styles/ShoesCard.module.css';
import { add } from '../hooks/Alerts';
import { useCartValue } from '../context/CartContext';
import capitalizeFirst from '../utils/functions/capitalizeFunction';
import { actionTypes } from '../context/CartReducer';

const ShoesCard = ({ shoe }) => {
  let buttonName = 'Add to cart';
  const [{ cart }, dispatch] = useCartValue();
  const addToCart = () => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      item: {
        id: shoe.id,
        barcode: shoe.barcode,
        brand: shoe.brand,
        model: shoe.model,
        color: shoe.color,
        size: shoe.size,
        url_path: shoe.url_path,
        price: shoe.price,
        quantity: 1,
      },
    });
    add();
  };
  return (
    <li className={s.shoesCard}>
      <Link to={`/${shoe.id}`}>
        <img
          className={s.shoesImage}
          src={require(`../utils/img${shoe.url_path}`)}
          alt={shoe.model}
        ></img>
      </Link>
      <div>{capitalizeFirst(shoe.brand)}</div>
      <div>{capitalizeFirst(shoe.model)}</div>
      <div>{`USD ${shoe.price}`}</div>
      <button className={s.productButton} type="submit" onClick={addToCart}>
        {buttonName}
      </button>
    </li>
  );
};

export default ShoesCard;
