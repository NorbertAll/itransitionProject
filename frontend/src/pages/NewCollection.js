import React from 'react';
import { LoadingButton } from '@mui/lab';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { Box, Link, TextField, Stack } from '@mui/material';
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"
function NewCollection() {
    const initialValues = {
        name: "",
        topic: "",
        description:"",

      };
      let navigate=useNavigate();
      const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name of collection is required"),
        topic: Yup.string().required("Topic is required"),
        description: Yup.string().required("Description of collection is required"),
      });
    
      const onSubmit = (data) => {
        axios.post("http://localhost:3001/collections", data, {headers:{
          accessToken: localStorage.getItem("accessToken")
        }}).then((response) => {
          if(response.data.error){
            console.log(response.data.error)
          }else{
            navigate(`/`)}
        });
      };
  return (
    <div className='createForm'>
        
        
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            
            <Form  className="formContainer">
                <h2>Create Collection</h2>
                <label>name:</label>
                <ErrorMessage name="name" component="span" />
                <Field as={TextField} id="inputCreteIdea" label="name" name="name" placeholder="name"/>
                <br/>
                <label>Desription:</label>
                <ErrorMessage name="description" component="span" />
                <Field as={TextField} id="inputCreteIdea" label="description" name="description" placeholder="description"/>
                <br/>
                <label>Topic:</label>
                <ErrorMessage name="topic" component="span" />
                <Field as={TextField} id="inputCreteIdea" label="topic" name="topic" placeholder="topic"/>
                <button  type='submit'>Stwórz</button>
            </Form>

        </Formik>
    </div>
  )
}

export default NewCollection