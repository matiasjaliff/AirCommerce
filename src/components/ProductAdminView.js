import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import find from '../utils/functions/findFunction';
import s from "../styles/ProductAdminView.module.css";
import SearchAdmin from "./SearchAdmin";
import ShoesAdminCard from './ShoesAdminCard';
//import Sidebar from './Sidebar';


const ProductAdminView = () => {
    const { search } = useParams();
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        find(`/products/${search}`)
        .then(productObj => setShoes(productObj))
        .catch(error => console.log(error))
    }, [search])
    
    //if(shoes.model === undefined) return null;
 
    return (
        <div>
            <SearchAdmin/> 
            {/* <Sidebar /> */}
            <ul className={s.productsGrid}>{shoes.map((shoe) => (<ShoesAdminCard key={shoe.id} shoe={shoe} />))}</ul>
        </div>
    )
}

export default ProductAdminView;