
import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import '../index.css'


const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  showDeletingMess,
  addComment,
  addReply,
  parentId = null,
  currentUserId,
}) => {


  const fiveMinutes = 300000
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes
  const canReply = Boolean(currentUserId)
  const canEdit = currentUserId === comment.user.userId && !timePassed
  const canDelete = currentUserId === comment.user.userId && !timePassed
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id
  const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id
  const replyId = parentId ? parentId : comment.id

  
 


  const [score, setScore] = useState(comment.score);

  function upVote() {
    setScore(count => count +1)
  }

  function downVote() {
    setScore(count => count -1)
  }
  

  return (
    //  ./images/avatars/image-amyrobson.png 
    <div className='comment'>
      <div className="comment-con">
        <div className="comment-vote">
          <button className='upBtn' onClick={() => upVote()}><img src="/icon-plus.svg" alt="upvote" /></button >
          <span>{score}</span>
          <button className='downBtn'  onClick={() => downVote()}><img src="/icon-minus.svg" alt="downvote" /></button >
        </div>

        <div className="comment-right-part">
          <div className="comment-info">
            <div className='comment-avatar'>
              <img className='avatar-img' src={comment.user.image.png} />
            </div>
            <span className="comment-author">{comment.user.username} </span>
            <span className="comment-date">{/*createdAt*/comment.createdAt}</span>
          </div>

          {!isEditing && <div className='comment-text'> {comment.content}</div>}
          {isEditing && (<CommentForm submitLable="Update" hasCancelButton initialText={comment.content}
            handleSubmit={(text) => {updateComment(text, comment.id), setActiveComment(null)}} />)}
            {/* handleCancel={() => setActiveComment(null)}  */}

          {isReplying && (<CommentForm submitLable="Reply" handleSubmit={(text) => addReply(text, replyId)} />)}

        </div>
        <div className='comment-actions'>

          {canEdit && <div className='comment-action' onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>
            <img src='/icon-edit.svg' /><span>Edit</span></div>}
            {canDelete && <div className='comment-action' onClick={() => {showDeletingMess(comment.id)}}>
            <img src='/icon-delete.svg' /><span>Delete</span></div>}
          {canReply && <div className='comment-action' onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>
            <img src='/icon-reply.svg' /><span> Reply</span></div>}
        </div>
      </div>

      <div className='reply-con'>
        {replies.length > 0 && (
          <div className="replies">
            {replies.map(reply => reply.replies.map(prop => (
              <Comment
                comment={prop}
                key={prop.id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                showDeletingMess = {showDeletingMess}
                updateComment={updateComment}
                parentId={comment.id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                addReply={addReply} />
            )))}
          </div>
        )}
      </div>



    </div>

  )
}

export default Comment





