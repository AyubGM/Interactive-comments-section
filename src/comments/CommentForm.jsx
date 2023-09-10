import React, { useState } from 'react'

const CommentForm = ({
  submitLable,
  handleSubmit,
  hasCancelButton = false,
  initialText = '',
  handleCancel

}) => {
  const [text, setText] = useState(initialText)
  const isTextareaDisabled = text.length === 0
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(text)
    setText("")
  }

  
  

  return (
    <div>
      <form onSubmit={onSubmit}>
        <img className='form-img ' src="/image-juliusomo.png" alt="" />
        <textarea placeholder='Add a comment...' className='comment-form-textarea' value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <button className='comment-form-button' disabled={isTextareaDisabled}>{submitLable}</button>
        {/* {hasCancelButton && (
          <button type='button' className='comment-form-button comment-form-cancel-button' onClick={handleCancel}>Cancle</button >
        )} */}

      </form>

    </div>
  )
}

export default CommentForm
