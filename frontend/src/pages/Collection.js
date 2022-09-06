import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react'
import axios from "axios";
import {useEffect, useState} from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';
import ListofItems from '../components/ListOdItem/LisOfItem';

const Collection = () => {
    let {id} =useParams();
    const {authState}=useContext(AuthContext)
    const [Collection, setCoollection]=useState([]);
    let navigate=useNavigate();
    
  useEffect(()=>{
    
    
   console.log(id)
     axios.get(`http://localhost:3001/collections/byId/${id}`).then((response)=>{
        console.log(response);
        setCoollection(response.data);
        
        
     })  
    }, []);



  return (
    
    <div>
        
        <div className="collectionanditem">
           <h2> Collection</h2>
           
         
              <div className='title'>name: {Collection.name}</div>
              <div className='topic'>topic: {Collection.topic}</div>
              <div className='body'>Desciption {Collection.description}</div>
              
                <div className='username'>Username: {Collection.username} </div> 
                
              
            </div>
            
              <button type="submit" onClick={()=>{navigate(`/newitem/${id}`)}} >New Item</button>
            <ListofItems collectionId={id}/>

        </div>
    
  )
}

export default Collection
