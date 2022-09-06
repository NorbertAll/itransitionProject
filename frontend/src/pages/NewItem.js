import React from 'react';
import { LoadingButton } from '@mui/lab';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { Box, Link, TextField, Stack } from '@mui/material';
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
function NewItem() {
    let {id} =useParams();
    const initialValues = {
        name: "",
        tags: "",

      };
      let navigate=useNavigate();
      const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name of collection is required"),
        tags: Yup.string().required("Tags is required"),
      
      });
    
      const onSubmit = (data) => {
        axios.post(`http://localhost:3001/items/${id}`, data, {headers:{
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
                <h2>Create Item</h2>
                <label>name:</label>
                <ErrorMessage name="name" component="span" />
                <Field as={TextField} id="inputCreteIdea" label="name" name="name" placeholder="name"/>
                <br/>
                <label>Tags:</label>
                <ErrorMessage name="tags" component="span" />
                <Field as={TextField} id="inputCreteIdea" label="tags" name="tags" placeholder="tags"/>
                <br/>
                <button  type='submit'>Stwórz</button>
            </Form>

        </Formik>
    </div>
  )
}

export default NewItem