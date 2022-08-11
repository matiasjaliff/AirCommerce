import { actionTypes } from '../context/CartReducer';
import s from '../styles/ProductView.module.css';
import capitalizeFirst from '../utils/functions/capitalizeFunction';
import { add } from '../hooks/Alerts';
import { useCartValue } from '../context/CartContext';
//import Button from "../commons/Button";

const ClientView = ({ shoes, id }) => {
  let buttonName = 'Add to cart';

  const [{ cart }, dispatch] = useCartValue();

  const addToCart = () => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      item: {
        id: shoes.id,
        barcode: shoes.barcode,
        brand: shoes.brand,
        model: shoes.model,
        color: shoes.color,
        size: shoes.size,
        url_path: shoes.url_path,
        price: shoes.price,
        quantity: 1,
      },
    });
    add();
  };

  return (
    <div>
      <p className={s.productTitle}>{`${capitalizeFirst(
        shoes.brand
      )} ${capitalizeFirst(shoes.model)}`}</p>
      <p>
        <span>Size: </span>
        <span>{`${shoes.size}`}</span>
      </p>
      <p>
        <span>Color: </span>
        {`${capitalizeFirst(shoes.color)}`}
      </p>
      <p>{`Stock: ${shoes.stock} available`}</p>
      <p>{`Price: USD ${shoes.price}`}</p>
      <button className={s.productButton} type="submit" onClick={addToCart}>
        {buttonName}
      </button>
    </div>
  );
};

export default ClientView;
