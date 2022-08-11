import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { errorLogin } from '../hooks/Alerts'

import useInput from '../hooks/useInput';

import { AuthContext } from '../context/AuthContext';
import { useCartValue } from '../context/CartContext';

const LogIn = () => {
  const navigate = new useNavigate();
  const { user, toggleAuth } = useContext(AuthContext);
  const [{ cart }] = useCartValue();

  const handleSubmit = (values) => {
    axios
      .post('/users/login', {
        email: values.email,
        password: values.password,
      })
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user.data));
        toggleAuth(user.data.name);
        axios
          .get(`/orders/load/${user.data.id}`)
          .then((order) => {
            const savedCart = order.data.products_buy;
            console.log('SAVED CART: ', savedCart);
            console.log('UNSAVED CART: ', cart);
            savedCart.forEach((element) => cart.push(element));
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log('FINAL CART', cart);
          })
          .catch((err) => console.log('ERROR: ', err));
      })
      .then(() => navigate('/Store'))
      .catch(() =>errorLogin() );
  };

  const validate = Yup.object({
    email: Yup.string()
      .email('El email ingresado no es válido')
      .required('Se requiere un email'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Se requiere contraseña'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <div className="container w-75 mt-4">
          <h3>Login</h3>
          <Form>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <Field
                name="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                className={
                  formik.touched.password && formik.errors.password
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mt-4 d-flex flex-row">
              <div className="form-group me-4">
                <Button type="submit" variant="dark">
                  Login
                </Button>
              </div>
            </div>
          </Form>
          <p className="mt-4">
            No tenés una cuenta en AirCommerce?&nbsp;
            <Link to="/signup">Te invitamos a registrarte.</Link>
          </p>
          <p>
            <a href="http://localhost:8080/api/users/auth/google">
              Log in with Google
            </a>
          </p>
        </div>
      )}
    </Formik>
  );
};

export default LogIn;
