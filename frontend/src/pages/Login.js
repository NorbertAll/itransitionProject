import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../helpers/AuthContext";
import { Box, Link, TextField, Stack } from '@mui/material';
import Button from '@mui/material/Button';

const Login = () => {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const {setAuthState}=useContext(AuthContext)

    let navigate=useNavigate();
    const login=()=>{
        const data={username:username, password:password};
        console.log(data);
        axios.post("http://localhost:3001/user/login", data).then((response) => {
            if(response.data.error){
               alert(response.data.error); 
            } else{
                localStorage.setItem('accessToken', response.data.token)
                setAuthState({username: response.data.username, id:response.data.id, status:true});
                navigate("/");
            }
            
        });
    }
  return (
    <Box
    className="createForm"
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' }, 
      display: 'flex',
        flexDirection: 'column',
    }}
    noValidate
    
    autoComplete="off"
  >
    <h2>Logowanie</h2>
        <label>Username:</label>
        <TextField type="text" label="username" onChange={(event)=>{setUsername(event.target.value);}}/>
        <label>Password:</label>
        <TextField type="password" label="password" onChange={(event)=>{setPassword(event.target.value);}}/>
        <Button variant="contained" color="success" onClick={login}>Login</Button>
    </Box>

  );
};

export default Login;
