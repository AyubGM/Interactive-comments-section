import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'

import data from '../data.json'

const Comments = ({currentUserId}) => {



    const [backendComments, setBackendComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    const [jsonData, setJsonData] = useState(data);
    // console.log(backendComments.map(backendComment => backendComment.replies.map(prop => prop.parentId)))
    
    
    
    
    const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null)
   
    
    
  
    const getReplies = commentId => {
      return backendComments.filter(backendComment => backendComment.id === commentId )
      .sort((a,b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      //  backendComments.filter(backendComment => backendComment.replies.map(prop => prop.parentId) === commentId)
      
    }

    

    const createComment = async (text, parentId = null) => {

      return {
        id: Math.random().toString(36).substr(2, 9),
        content: text,
        parentId,
        userId: "1",
        "score": 0,
        user: {
          image: { 
            "png": "/image-juliusomo.png",
            "webp": "/image-juliusomo.webp"
          },
          username: "juliusomo",
          "userId":"10",
        },
        // new Date().toISOString()
        createdAt: "now",
        replies:[]
        
      };
    };
      
    const addComment = (text, parentId) =>{
      console.log("addComment", text,parentId)
      createComment(text,parentId).then( (comment) => {
        setBackendComments([comment, ...backendComments])
        setActiveComment(null)

      })
    }


    
    const createReply = async (text, parentId = null) => {
     const replies = backendComments.filter(prop => prop.id == parentId)
     
     const reply = replies.map(prop => prop.replies.push({
      "id": Math.random().toString(36).substr(2, 9),
      "parentId": null,
      "content": text,
      "createdAt": "now",
      "score": 0,
      "user": {
        "image": { 
          "png": "/image-juliusomo.png",
          "webp": "/image-juliusomo.webp"
        },
        "username": "juliusomo",
        "userId":"10"
      }}))

      return { reply};
    };

       
    const addReply = (text, parentId) =>{
      console.log("addReply", text,parentId)
      createReply(text,parentId)
      .then( (comment) => {
        setBackendComments([comment, ...backendComments])
        console.log(backendComments)
        setActiveComment(null)

      })
    }


    const modal = document.querySelector(".modal-wrp")
    const yes = document.querySelector(".yes")
    const no = document.querySelector(".no")
    let isDeleting

    function showDeletingMess(commentId) {
      modal.style.display = "flex"
      yes.addEventListener("click", () =>{isDeleting = true,deleteComment(commentId), console.log(isDeleting)})
      no.addEventListener("click", () =>{isDeleting = false})
      console.log(isDeleting)
    }
  
    function removeDeletingMess() {
      modal.style.display = "none"
    }

    const deleteCommentF = async (commentId) => {
      return {commentId};
    };

    

    const deleteComment = (commentId) => {
      if(isDeleting === true){
        deleteCommentF(commentId).then(() =>{
          const updatedBackendComments = backendComments.filter(backendComment => backendComment.id !== commentId )
          setBackendComments(updatedBackendComments)
          removeDeletingMess()
        })}
      

    }


    const updateCommentF = async () => {
      return {};
    };

    const updateComment = (text, commentId) => {
      updateCommentF(text,commentId).then(() => {
        console.log(text)
        const updatedBackendComments = backendComments.map(backendComment => {
          if (backendComment.id === commentId){
            return{...backendComment, content:text}
          }
          return backendComment
        })
        setBackendComments(updatedBackendComments)
      })

    }

    

    useEffect(() => {
      // getCommentsApi().then(data => {
      //   setBackendComments(data)

      // })
       setBackendComments(jsonData.comments)


    },[])
   
    
  return (
    
    <div className='comments'>
      <div className="comments-container">
      {/* <h1 className='.comment-actions'>{data.currentUser.username}</h1> */}
        {rootComments.map(rootComment => (
          
          <Comment 
          key={rootComment.id} 
          comment={rootComment}
          replies ={getReplies(rootComment.id)}
          currentUserId = {currentUserId}
          deleteComment={deleteComment}
          showDeletingMess = {showDeletingMess}
          activeComment = {activeComment}
          setActiveComment = {setActiveComment}
          addComment = {addComment}
          addReply = {addReply}
          updateComment = {updateComment}
           />
        ))}

      </div>
      <CommentForm submitLable ="SEND" handleSubmit={addComment} />

      <div className="modal-wrp invisible">
        <div className="modal container">
          <h3>Delete comment</h3>
          <p>Are you sure you want to delete this comment? This will remove the comment and cant be undone</p>
          <div className='yes-no'>
            <button className="yes" onClick={() => { isDeleting =true }} >YES,DELETE</button>
           
            <button className="no"  onClick={() => { removeDeletingMess() }} >NO,CANCEL</button>
          </div>
        </div>
      </div>

    </div>
    
  )
  
}

export default Comments
