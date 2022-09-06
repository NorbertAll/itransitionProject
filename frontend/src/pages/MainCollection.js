import React, { useContext } from 'react'
import axios from "axios";
import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';


function MainCollection() {
    const {authState}=useContext(AuthContext)
    const [listOfCollection, setListOfCoollection]=useState([]);
    let navigate=useNavigate();
    
  useEffect(()=>{
    
    let id=authState.id
   
     axios.get(`http://localhost:3001/collections/byuserId/${id}`).then((response)=>{
        setListOfCoollection(response.data);
        
        
     })  
    }, []);



  return (
    
    <div>
        
        <div className="content">
           <h2> My Collections</h2>
           {listOfCollection.map((value, key)=>{
            return <div className="idea" key={value.id} >
              <div className='title'>name: {value.name}</div>
              <div className='topic'>topic: {value.topic}</div>
              <div className='body'  onClick={()=>{navigate(`/collection/${value.id}`)}}>{value.description}</div>
              <div className='footer'>
                <div className='username'><Link className='none' to ={`/profile/${value.id}`}> {value.username} </Link></div> 
                
              </div>
             
            </div>
          })}
        </div>
    </div>
  )
}

export default MainCollection