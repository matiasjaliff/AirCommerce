import React from 'react';
import { Carousel } from 'react-bootstrap';
import s from '../styles/Home.module.css';

const Home = () => {
  return (
    <Carousel className="w-80">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../utils/img/jordan-banner.webp")}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../utils/img/reebok-banner.jpg")}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../utils/img/adidas-banner.webp")}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>

    // <div className={s.Home}>
    //   <h1 style={{ textAlign: 'center' }}>Welcome to AirCommerce</h1>
    //   <img
    //     src="https://i.gifer.com/L0cq.gif"
    //     alt="this slowpoke moves"
    //     style={{ justifyContent: 'center' }}
    //     width="40%"
    //     height="40%"
    //   />
    // </div>
  );
};

export default Home;
