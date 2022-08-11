import React from "react"
import { useNavigate } from "react-router-dom";
import s from "../styles/ProductAdminView.module.css";
import capitalizeFirst from "../utils/functions/capitalizeFunction";

const ShoesAdminCard = ({shoe}) => {
    const navigate = useNavigate();

    const editProduct = (e) => {
        e.preventDefault(e)
        navigate(`/update_product/single/${shoe.id}`)
    }
    
    return (
        <li className={s.productContainer}>
            <div>
                <img className={s.productImg} src={require(`../utils/img${shoe.url_path}`)} alt={shoe.model}></img>
            </div>
            <div className={s.productDetails}>
                <p className={s.productTitle}>{`${capitalizeFirst(shoe.brand)} ${capitalizeFirst(shoe.model)}`}</p>
                <p>{`Size: ${shoe.size}`}</p>
                <p>{`Color: ${capitalizeFirst(shoe.color)}`}</p>
                <p>{`Price: USD ${shoe.price}`}</p>
                <p>{`Stock: ${shoe.stock} available`}</p>
                <p>{`Barcode: ${shoe.barcode}`}</p>
                <button className={s.productButton} type="submit" onClick={editProduct}>Edit</button>
            </div>
       </li>
    )
}

export default ShoesAdminCard;

