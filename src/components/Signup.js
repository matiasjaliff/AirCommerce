import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { registered, userExist } from '../hooks/Alerts'


const Signup = () => {
  const navigate = new useNavigate();

  const handleRegister = (values) => {
    console.log('REGISTRAR');
    axios
      .post('/users/register', {
        name: values.name,
        surname: values.surname,
        email: values.email,
        dni: values.dni,
        address: values.address,
        password: values.password,
      })
      .then((user) => {
        registered()
        console.log(user.data[0].id);
        axios.post('/orders/add', {
          orderNumber: null,
          products_buy: [],
          price_final: 0,
          userNumber: user.data[0].id,
          fullfilled: false,
          rejected: false,
        });
      })
      .then((res) => navigate('/login'))
      .catch(() => { userExist() });
  };

  const validate = Yup.object({
    name: Yup.string().required('Se requiere un nombre'),
    surname: Yup.string().required('Se requiere un apellido'),
    email: Yup.string()
      .email('El email ingresado no es válido')
      .required('Se requiere un email'),
    dni: Yup.number().required('Se requiere su número de DNI'),
    address: Yup.string().required('Se requiere un domicilio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Se requiere contraseña'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'La contraseña no coincide')
      .required('Se requiere confirmación de contraseña'),
  });
  return (
    <Formik
      initialValues={{
        name: '',
        surname: '',
        email: '',
        dni: '',
        address: '',
        password: '',
        confirmpassword: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleRegister(values);
      }}
    >
      {(formik, isSubmitting) => (
        <div className="container w-75 mt-4">
          <h3>Sign Up</h3>
          <Form>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <Field
                name="name"
                className={
                  formik.touched.name && formik.errors.name
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="text"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="surname">Apellido</label>
              <Field
                name="surname"
                className={
                  formik.touched.surname && formik.errors.surname
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="text"
              />
              {formik.touched.surname && formik.errors.surname ? (
                <div className="invalid-feedback">{formik.errors.surname}</div>
              ) : null}
            </div>
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
              <label htmlFor="dni">DNI</label>
              <Field
                name="dni"
                className={
                  formik.touched.dni && formik.errors.dni
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="text"
              />
              {formik.touched.dni && formik.errors.dni ? (
                <div className="invalid-feedback">{formik.errors.dni}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="address">Domicilio</label>
              <Field
                name="address"
                className={
                  formik.touched.address && formik.errors.address
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="text"
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="invalid-feedback">{formik.errors.address}</div>
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
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirmá tu password</label>
              <Field
                name="confirmpassword"
                className={
                  formik.touched.confirmpassword &&
                  formik.errors.confirmpassword
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="password"
              />
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <div className="invalid-feedback">
                  {formik.errors.confirmpassword}
                </div>
              ) : null}
            </div>
            <div className="mt-4 d-flex flex-row">
              <div className="form-group me-4">
                <Button type="submit" variant="dark">
                  Registrarme
                </Button>
              </div>
              <div className="form-group">
                <Button type="reset" variant="dark">
                  Borrar Formulario
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Signup;
