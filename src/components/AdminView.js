import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios"
import s from "../styles/AdminView.module.css";
import { create } from '../hooks/Alerts';
const FormData = require('form-data');

const AdminView = () => {
    const navigate = useNavigate();


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
                    brand: Yup.string()
                            .required("Required"),
                    model: Yup.string()
                            .required("Required")
                            .min(2, "Name must be 2 characters at minimum "),
                    size: Yup.number("Size must be a number")
                            .required("Required")
                            .integer("Size must be an integer")
                            .test(
                                'Is positive?', 
                                'ERROR: The number must be greater than 0!', 
                                (value) => value > 0
                            ),
                    color: Yup.string()
                            .required("Required")
                            .min(4, "Color must be 4 characters at minimum "),
                    stock: Yup.number("Stock must be a number")
                            .required("Required")
                            .integer("Stock must be an integer"),
                    price:Yup.number("Price must be a number")
                            .required("Required"),
                    barcode:Yup.number()
                            .required("Required")
                })}
                onSubmit={values => {
                    const body = new FormData();
                    body.append( "brand", values.brand.toLowerCase())
                    body.append( "model", values.model.toLowerCase())
                    body.append( "size", values.size)
                    body.append( "color", values.color.toLowerCase())
                    body.append( "stock", values.stock)
                    body.append( "price", values.price)
                    body.append( "barcode", values.barcode)
                    body.append( "photo", values.photo)
                    
                    
                    axios({
                        method: 'post',
                        url: 'http://localhost:8080/api/products',
                        data: body,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    })
                    .then(serverAnswer => {
                        console.log("SERVER RESPONSE: ",serverAnswer.data);
                        create();
                        navigate(`/${serverAnswer.data.id}`);
                    })
                    .catch(err => console.log(err))
                }}
                >
                {formProps => (
                <Form className={s.form}>
                    <div>Brand</div>
                    <Field className={s.input} name="brand" type="text"/> <br/>
                    <ErrorMessage className={s.error} name="brand" /> <br/>

                    <div>Name</div>
                    <Field className={s.input} name="model" type="text"/> <br/>
                    <ErrorMessage name="model" /> <br/>
                    
                    <div>Size</div>
                    <Field className={s.input} name="size" type="text"/> <br/>
                    <ErrorMessage name="size" /> <br/>

                    <div>Color</div>
                    <Field className={s.input} name="color" type="text"/> <br/>
                    <ErrorMessage name="color" /> <br/>

                    <div>Stock</div>
                    <Field className={s.input} name="stock" type="text"/> <br/> 
                    <ErrorMessage name="stock" /> <br/>

                    <div>Price</div>
                    <Field className={s.input} name="price" type="text"/> <br/>
                    <ErrorMessage name="price" /> <br/>
                    
                    <div>Barcode</div>
                    <Field className={s.input} name="barcode" type="text"/> <br/>
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

export default AdminView;