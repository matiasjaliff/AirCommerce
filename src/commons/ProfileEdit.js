import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


const ProfileEdit = () => {
    const navigate = new useNavigate();

    const handleRegister = (values) => {
        axios
            .put('/users/edit', {
                name: values.name,
                surname: values.surname,
                email: values.email,
                dni: values.dni,
                address: values.address,
                password: values.password,
            })
            .then((user) => {
                console.log(user);
                navigate('/profile');
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    dni: '',
                    address: '',

                }}
                onSubmit={(values) => {
                    handleRegister(values);
                }}
            >
                {(formik, isSubmitting) => (
                    <div className="container w-75 mt-4">
                        <h3>Edit My Profile</h3>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
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
                                <label htmlFor="surname">Surname</label>
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
                                <label htmlFor="address">Adress</label>
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

                            <div className="mt-4 d-flex flex-row">
                                <div className="form-group me-4">
                                    <Button  type="submit" variant="dark">
                                        Edit
                                    </Button>
                                </div>
                                <div className="form-group">
                                    <Button  type="reset" variant="dark">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    )
}

export default ProfileEdit