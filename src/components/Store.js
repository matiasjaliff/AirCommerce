import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ShoesCard from './ShoesCard';
import SortBy from "./SortBy"
import s from '../styles/ShoesGrid.module.css';

const Store = () => {
  const [store, setStore] = useState([]);
  const navigate = useNavigate();

  const handleSort = async (type) => {
   
    navigate(`/Store/sortBy/${type}`)
  };

  
  
  useEffect(async () => {
    try {
      let str = await axios.get(`http://localhost:8080/api/products`);
      str = str.data;
      let shoesAux = [];
      let numAux = [];
      let randNum = 0;
      for (let i = 0; i < 9; i++) {
        randNum = Math.floor(Math.random() * str.length);
        if (numAux.includes(randNum) === true) {
          i = i - 1;
        } else {
          numAux.push(randNum);
          shoesAux.push(str[randNum]);
        }
      }
      setStore(shoesAux);
      
    } catch (error) {console.log(error)}
  }, []);

  return (
    <div>
    <div className={s.dropdownContainer}>
    <div className={s.dropdown} key={'SortB'}>
    <button className={s.dropbtn}>Brand</button>
    <div className={s.dropdownContent}>
    <a  onClick={() => {handleSort('+brand')}}><p>A-Z</p></a>
    <a  onClick={() => {handleSort('-brand')}}><p>Z-A</p></a>
    </div>
    </div>
    
    <div className={s.dropdown} key={'SortP'}>
    <button className={s.dropbtn}>Price</button>
    <div className={s.dropdownContent}>
    <a  onClick={() => {handleSort('+price')}}><p>Low-Hig</p></a>
    <a  onClick={() => {handleSort('-price')}}><p>Hig-Low</p></a>
    </div>
    </div>
    <div className={s.dropdown} key={'SortS'}>
    <button className={s.dropbtn}>Size</button>
    <div className={s.dropdownContent}>
    <a  onClick={() => {handleSort('+size')}}><p>Low-Hig</p></a>
    <a  onClick={() => {handleSort('-size')}}><p>Hig-Low</p></a>
    </div>
    </div>
    </div>
          <ul className={s.shoesGrid}>
            {store.map((shoe) => (
              <ShoesCard shoe={shoe} />
            ))}
          </ul>
        </div>
      
  );
};


export default Store;
