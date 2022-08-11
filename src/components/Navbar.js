import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../utils/img/Logo.jpg';
import Search from './Search';
import { AuthContext } from '../context/AuthContext';
import { useCartValue } from '../context/CartContext';

const NavBar = () => {
  const { user, toggleAuth } = useContext(AuthContext);
  const userStorage = JSON.parse(localStorage.getItem('user'));
  const cartStorage = JSON.parse(localStorage.getItem('cart'));
  const [{ cart }] = useCartValue();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post('/users/logout')
      .then(() => {
        axios.put('/orders/save', {
          userNumber: JSON.parse(localStorage.user).id,
          products_buy: cartStorage,
        });
      })
      .then(() => navigate('/'))
      .then((res) => {
        cart.splice(0, cart.length);
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        toggleAuth(null);
        console.log('LOGOUT DONE');
      })
      .catch((err) => console.log('ERROR: ', err));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand
          href="/"
          style={{ fontSize: 'x-large', fontWeight: 'bold' }}
        >
          <img
            src={logo}
            width="50"
            height="50"
            style={{ borderRadius: '5px' }}
            alt="logo"
          />
          &nbsp;&nbsp;AirCommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-1 my-2 my-lg-0">
            <Nav.Link href="/Store">Store</Nav.Link>
            {user ? (
              <>
                <Nav.Link href={`/account/${user}`} className="">
                  Mi Cuenta
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/Login">Login</Nav.Link>
                <Nav.Link href="/Signup">Registrarme</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/Cart">
              <Button  style={{color:'black', borderColor:'black'}} variant="outline-success">
                <FaShoppingCart />
              </Button>
            </Nav.Link>
          </Nav>

          <Nav className="me-auto my-2 my-lg-0">
            {user ? (
              <>
                <Navbar.Text>Hola {user}!</Navbar.Text>
              </>
            ) : (
              <></>
            )}
          </Nav>

          <Search className="me-auto my-2 my-lg-0" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
