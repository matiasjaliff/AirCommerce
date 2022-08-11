import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import find from "../utils/functions/findFunction";
import s from "../styles/AdminView.module.css";
import { update } from '../hooks/Alerts';
const FormData = require('form-data');


const AdminViewEdit = () => {
    const navigate = useNavigate();
    let id = useParams().id;
    const [shoes, setShoes] = useState({});

    useEffect(() => {
        find(`/products/single/${id}`)
        .then(productObj => setShoes(productObj))
        .catch(error => console.log(error))
    }, [id])

    
    return (
        <div className={s.container}>

            <Formik
                initialValues= {{
                    brand: "",
                    model: "",
                    size: "",
                    color: "",
                    stock: "",
                    price: "",
                    barcode: "",
                    photo: ""
                }}
                validationSchema= {Yup.object({
                    brand: Yup.string(),
                    model: Yup.string(),
                    size: Yup.number("Size must be a number")
                            .integer("Size must be an integer"),
                    color: Yup.string(),
                    stock: Yup.number("Stock must be a number")
                            .integer("Stock must be an integer"),
                    price:Yup.number("Price must be a number"),
                    barcode:Yup.number()

                })}
                onSubmit={values => {
                    const body = new FormData();
                    
                    if (values.brand) {
                        body.append( "brand", values.brand.toLowerCase())
                    }
                    if (values.model) {
                        body.append( "model", values.model.toLowerCase())
                    }
                    if (values.size) {
                        body.append( "size", values.size)
                    }
                    if (values.color) {
                        body.append( "color", values.color.toLowerCase())
                    }
                    if (values.price) {
                        body.append( "price", values.price)
                    }
                    if (values.stock) {
                        body.append( "stock", values.stock)
                    }
                    if (values.barcode) {
                        body.append( "barcode", values.barcode)
                    }
                    if (values.photo) {
                        body.append( "photo", values.photo)
                    }

                    axios({
                        method: 'put',
                        url:`http://localhost:8080/api/products/${id}`,
                        data: body,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    })
                    .then(serverAnswer => {
                        console.log("SERVER RESPONSE: ",serverAnswer.data);
                        update();
                        navigate(`/${serverAnswer.data.id}`);
                    })
                    .catch(err => console.log(err))
                }}
                >
                {formProps => (
                <Form className={s.form}>
                    <div>Brand</div>
                    <Field className={s.input} name="brand" type="text" placeholder={`${shoes.brand}`}/> <br/>
                    <ErrorMessage className={s.error} name="brand" /> <br/>

                    <div>Name</div>
                    <Field className={s.input} name="model" type="text" placeholder={`${shoes.model}`}/> <br/>
                    <ErrorMessage name="model" /> <br/>
                    
                    <div>Size</div>
                    <Field className={s.input} name="size" type="text" placeholder={`${shoes.size}`}/> <br/>
                    <ErrorMessage name="size" /> <br/>

                    <div>Color</div>
                    <Field className={s.input} name="color" type="text" placeholder={`${shoes.color}`}/> <br/>
                    <ErrorMessage name="color" /> <br/>

                    <div>Stock</div>
                    <Field className={s.input} name="stock" type="text" placeholder={`${shoes.stock}`}/> <br/> 
                    <ErrorMessage name="stock" /> <br/>

                    <div>Price</div>
                    <Field className={s.input} name="price" type="text" placeholder={`${shoes.price}`}/> <br/>
                    <ErrorMessage name="price" /> <br/>
                    
                    <div>Barcode</div>
                    <Field className={s.input} name="barcode" type="text" placeholder={`${shoes.barcode}`}/> <br/>
                    <ErrorMessage name="barcode" /> <br/>

                    <div>Photo</div>
                    <input name="photo" type="file" 
                    onChange={e => formProps.setFieldValue("photo", e.target.files[0])}/><br/><br/>
                    
                    <button className={s.button} 
                        type="submit">
                        SUBMIT
                    </button>
                </Form>
                    )}
            </Formik>
        </div>
    )
}

export default AdminViewEdit;