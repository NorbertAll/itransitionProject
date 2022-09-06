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
import Home from './pages/Home';
import NewCollection from './pages/NewCollection';
import MainCollection from './pages/MainCollection';
import Collection from './pages/Collection';
import NewItem from './pages/NewItem';
import Item from './pages/Item';

function App() {
  const[authState, setAuthState]= useState({username: "", id:0, role:"", status:false});
   
    useEffect(()=>{
      axios.get("http://localhost:3001/user/token", {headers:{
        accessToken:localStorage.getItem('accessToken')
      }}).then((response)=>{
        if(response.data.error){
          setAuthState({username: "", id:0, role: "", status:false});
          
        }else{
          setAuthState({
            username: response.data.username, 
            id:response.data.id, 
            role: response.data.role,
            status:true

          });
          
        }
      })
        
      
    }, [])

    const logout=()=>{
        localStorage.removeItem("accessToken");
        setAuthState({username: "", id:0, role:"", status:false});
        
    }
    
  return (
    <div className="app">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className='navbar'>
          {!authState.role ?(<div>
            <Link to="/login">Login</Link>
            <Link to="/registration">Registraion</Link>
            </div>): ("")}
            

            
            {authState.role ?(
              <>
               {authState.role=="admin" ?(
            <Link to="/userapp">Users</Link>
            ): ("")}
            <Link to="/">Strona Główna</Link>
            <Link to="/newcollection">New Collection</Link>
              <div className='loggedInContainer' >
              <Link to="/main">{authState.username}</Link>
              {authState.status &&<Button variant="outline-danger" onClick={logout}>Logout</Button>}
            </div>
              </>
            ): ("")} 
             
           
            
          </div>
        <Routes>
        {!authState.role ?(<> 
          
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/*" exact element={<Login/>}/>
          </>):("") }
        
          {authState.role=="admin" ?(<> 
          <Route path="/" element={<Home/>}/>
          <Route path="/userapp" element={<AdminPanel/>}/>
         <Route path="*" element={<NoPage />} />
         </>):("") }
         {authState.role=="user" ?(<> 
          <Route path="/" element={<Home/>}/>
          <Route path="/newcollection" element={<NewCollection/>}/>
          <Route path="/main" element={<MainCollection/>}/>
         <Route path="*" element={<NoPage />} />
         <Route path="/collection/:id" element={<Collection/>}/>
         <Route path="/newitem/:id" element={<NewItem/>}/>
         <Route path="/item/:id" element={<Item/>}/>
         </>):("") }
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
