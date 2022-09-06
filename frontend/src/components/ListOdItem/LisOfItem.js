import React, { useContext } from 'react'
import axios from "axios";
import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../../helpers/AuthContext';



function ListofItems(props) {
    const {authState}=useContext(AuthContext)
    const [listOfItems, setListOfItems]=useState([]);
    const [likedList, setLikedList]=useState([]);
    let navigate=useNavigate();
    
  useEffect(()=>{
    
     axios.get(`http://localhost:3001/items/${props.collectionId}`, {headers: {accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
        console.log("itemsy");
        console.log(response.data);
        setListOfItems(response.data.listOfItem)
        setLikedList(response.data.likedItem.map((like)=>{return like.ItemId}))
        
     })  
    }, []);

  const likeItems= (itemId)=> {
    
    axios.post("http://localhost:3001/likes/", {ItemId: itemId}, {headers: {accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
      
        setListOfItems(listOfItems.map((item)=>{
          if(item.id===itemId){
            if(response.data.liked===true){
              return {...item, Likes: [...item.Likes, 0]}
            }else{
             const likeArray=item.Likes
             likeArray.pop()
              return {...item, Likes: likeArray}
            }
            
          }else{
            return item
          }
        }));
        if(likedList.includes(itemId)){
          setLikedList(likedList.filter((id)=>{
            return id != itemId
          }))
        }else{
          setLikedList([...likedList, itemId])
        }
     }) 
  }

  return (
    
   
     <div className="content">
      {listOfItems.map((value, key)=>{
            return <div className="idea" key={value.id} >
              <div className='title'>{value.name}</div>
              <div className='body'  onClick={()=>{navigate(`/item/${value.id}`)}}>{value.tags}</div>
              <div className='footer'>
                <div className='username'><Link className='none' to ={`/profile/${value.id}`}> {value.username} </Link></div> 
                <div className='buttons'>
                  <ThumbUpIcon onClick={()=>likeItems(value.id)} className={likedList.includes(value.id)?"unlikeBtn":"likeBtn"} />
                 

                  
                </div>
              </div>
            </div>
          })}
    </div>
  )
}

export default ListofItems