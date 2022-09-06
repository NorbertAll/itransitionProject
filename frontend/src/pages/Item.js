import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


function Item() {
    let {id} =useParams();
    const [ itemObject, setItemObject]= useState({});
    const [comments, setComments] = useState([]);
    
    const [newComment, setNewComment] = useState("");
    const {authState}=useContext(AuthContext)
    let navigate=useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:3001/items/byId/${id}`).then((response)=>{
            setItemObject(response.data)
         });
         axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        }); 
   }, [])
        const addComment = () => {
          axios
            .post("http://localhost:3001/comments", {
              commentBody: newComment,
              ItemId: id,
            }, {headers:{
              accessToken: localStorage.getItem("accessToken")
            }})
            .then((response) => {
              if(response.data.error){
                console.log(response.data.error)
              }else{
              const commentToAdd = { commentBody: newComment ,username:response.data.username};
              setComments([...comments, commentToAdd]);
              setNewComment("");}
            });
        };
      
  const deleteComment=(id)=>{
    axios.delete(`http://localhost:3001/comments/${id}`, {headers:{
      accessToken: localStorage.getItem("accessToken")
    }})
    .then(()=>{
      setComments(comments.filter((val)=>{
        return val.id!=id;
        
      }));
   });
  }

  const deleteItem=(id)=>{
    axios.delete(`http://localhost:3001/items/${id}`, {headers:{
      accessToken: localStorage.getItem("accessToken")
    }})
    .then((response)=>{
      alert(response.data)
      navigate("/")
   });
  }

  const editItem = (option) =>{
    if(option ==="name"){
      let newName = prompt("Enter New Name")
      axios.put("http://localhost:3001/items/name", {newName:newName, id:id}, {headers:{
        accessToken: localStorage.getItem("accessToken")
      }})
      setItemObject({...itemObject, name: newName})
    }else{
      if(option==="body"){
        let newTags = prompt("Enter New Tags");
        axios.put("http://localhost:3001/items/tags", {newTags:newTags, id:id}, {headers:{
        accessToken: localStorage.getItem("accessToken")
      }})
      setItemObject({...itemObject, itemTags: newTags})
      }else{
        alert("error");
      }
    }
  }
  return (
    <div className='itemPage'>
        <div className='ideax'>
          {authState.username===itemObject.username&&(<HighlightOffIcon onClick={()=>{deleteItem(itemObject.id)}} className='delicon'/>)}
            <div className='title' onClick={()=>{if(authState.username===itemObject.username)editItem("name")}}>

              
              <div className='titleName'>{itemObject.name}</div>
              
            </div>
            <div className='body'  onClick={()=>{if(authState.username===itemObject.username)editItem("tags")}}>{itemObject.tags}</div>
            <div className='footer'>{itemObject.username}</div>
        </div>
        <hr/>
        <div className="commentx">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          /><br/>
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <div className='bodycomment'><b>{comment.commentBody}</b></div>
                <div className='authorcomment'>{comment.username}</div>
                {authState.username===comment.username && <HighlightOffIcon className='delCom' onClick={()=>{deleteComment(comment.id)}}/>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Item