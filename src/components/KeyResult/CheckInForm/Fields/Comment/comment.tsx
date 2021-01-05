import React, { useState } from 'react'

import CheckInFormFieldCommentButton from './button'
import CheckInFormFieldCommentInput from './input'

export interface CheckInFormFieldCommentProperties {
  submitOnBlur?: boolean
}

const CheckInFormFieldComment = ({ submitOnBlur }: CheckInFormFieldCommentProperties) => {
  const [showInput, setShowInput] = useState(false)

  const handleShowInput = () => {
    setShowInput(true)
  }

  return showInput ? (
    <CheckInFormFieldCommentInput submitOnBlur={submitOnBlur} />
  ) : (
    <CheckInFormFieldCommentButton onClick={handleShowInput} />
  )
}

export default CheckInFormFieldComment
