import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Box, Link, TextField, Stack } from '@mui/material';

const Registration = () => {
    const initialValues = {
        username: "",
        password: "",
        password_confirm:""
      };
      let navigate=useNavigate();
      const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username required"),
        password: Yup.string().required("Password required"),
        password_confirm: Yup.string().required("Confirm password required"),
      });

      const onSubmit = (data) => {
        if(data.password===data.password_confirm){
            delete data.password_confirm;
             axios.post("http://localhost:3001/user", data).then ((response) => {
                console.log(response);
                navigate(`/login`)
             });
        }
        else{
            alert('password not confirmed')
        }
        delete data.password_confirm;
        console.log(data);
       
      };  
    return (
    <div className='createForm'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            
        <Form className="formContainer">
            <h2>Registration</h2>
            <label>Username:</label>
            <ErrorMessage name="username" component="span" />
            <Field as={TextField} id="username" label="username" name="username" placeholder="Username"/>
            <br/>
            <label>Password:</label>
            <ErrorMessage name="password" component="span" />
            <Field as={TextField} id="password" label="password" name="password" type="password" placeholder="password"/  >
            <br/>
            <label>Confirm Password:</label>
            <ErrorMessage name="password_confirm" component="span" />
            <Field as={TextField} id="password_confirm" label="confirm password" name="password_confirm" type="password" placeholder="Confirm Password"/>
            <br/>
            <button type='submit'>Registration</button>
        </Form>

        </Formik>
    </div>
    )
};

export default Registration;
