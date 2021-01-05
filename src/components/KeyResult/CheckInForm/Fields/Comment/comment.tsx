import React, { useState } from 'react'

import CheckInFormFieldCommentButton from './button'
import CheckInFormFieldCommentInput from './input'

const CheckInFormFieldComment = () => {
  const [showInput, setShowInput] = useState(false)

  const handleShowInput = () => {
    setShowInput(true)
  }

  return showInput ? (
    <CheckInFormFieldCommentInput />
  ) : (
    <CheckInFormFieldCommentButton onClick={handleShowInput} />
  )
}

export default CheckInFormFieldComment
