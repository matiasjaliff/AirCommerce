import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import find from '../utils/functions/findFunction';
import Carousel from "../commons/Carousel";
import s from "../styles/ProductView.module.css";
import ClientView from './ClientView.js';

const ProductView = () => {
    let id = useLocation().pathname.slice(1);
    const [shoes, setShoes] = useState({});

    useEffect(() => {
        find(`/products/single/${id}`)
        .then(productObj => setShoes(productObj))
        .catch(error => console.log(error))
    }, [id])

    if(shoes.model === undefined) return null;

    return (
        <div className={s.productContainer}>
            <img className={`${s.column} ${s.productImg}`} src={require(`../utils/img${shoes.url_path}`)} alt={shoes.model}></img>
            <div className={`${s.column} ${s.productDetails}`}><ClientView shoes={shoes} id={id}/></div>
            <Carousel id={id}/>
        </div>
    )
}

export default ProductView;
