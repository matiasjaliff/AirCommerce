import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import s from '../styles/ProductCard.module.css';
import { useCartValue } from '../context/CartContext';
import { actionTypes } from '../context/CartReducer';
import Swal from 'sweetalert2'

const ProductCard = ({ shoe, handleQuantity, handleRemoveItem }) => {
  const [{ cart }, dispatch] = useCartValue();

  const changeQuantity = (event) =>
    dispatch({
      type: actionTypes.CHANGE_QUANTITY,
      id: shoe.id,
      newQuantity: Number(event.target.value),
    });

  const removeItem = () =>{
    Swal.fire({
      title: "Delete Porduct",
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: actionTypes.REMOVE_ITEM,
          id: shoe.id,
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })}

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
          <li>Precio: USD {Math.round(shoe.price)}</li>
        </ul>
        <div className={s.cantidad}>
          <label>Cantidad:&nbsp;</label>      
          <select name={s.quantity} onChange={changeQuantity}>
            <option value="1" selected={shoe.quantity === 1 ? "selected" : ""}>1</option>
            <option value="2" selected={shoe.quantity === 2 ? "selected" : ""}>2</option>
            <option value="3" selected={shoe.quantity === 3 ? "selected" : ""}>3</option>
            <option value="4" selected={shoe.quantity === 4 ? "selected" : ""}>4</option>
            <option value="5" selected={shoe.quantity === 5 ? "selected" : ""}>5</option>
          </select>
        </div>
        <div className={s.trash}>
          <p>
            <FaTrashAlt onClick={removeItem} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
