import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from 'react-router-dom';

import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import NoPage from './pages/NoPage';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import Button from '@mui/material/Button';

import Button from 'react-bootstrap/Button';

function App() {
  const[authState, setAuthState]= useState({username: "", id:0, status:false});
   
    useEffect(()=>{
      axios.get("http://localhost:3001/user/token", {headers:{
        accessToken:localStorage.getItem('accessToken')
      }}).then((response)=>{
        if(response.data.error){
          setAuthState({username: "", id:0, status:false});
        }else{
          setAuthState({
            username: response.data.username, 
            id:response.data.id, 
            status:true
          });
        }
      })
        
      
    }, [])

    const logout=()=>{
        localStorage.removeItem("accessToken");
        setAuthState({username: "", id:0, status:false});
        
    }
  return (
    <div className="app">
      <Router>
        <div className='navbar'>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registraion</Link>
          <Link to="/userapp">Users</Link>
        </div>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/userapp" element={<AdminPanel/>}/>
         <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
