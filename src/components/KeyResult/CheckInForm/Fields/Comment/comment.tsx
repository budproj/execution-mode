import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultCheckInCommentEnabled } from 'src/state/recoil/key-result/check-in'

import CheckInFormFieldCommentEnableButton from './enable-button'
import CheckInFormFieldCommentInput from './input'

export interface CheckInFormFieldCommentProperties {
  keyResultID?: KeyResult['id']
  submitOnBlur?: boolean
}

const CheckInFormFieldComment = ({
  keyResultID,
  submitOnBlur,
}: CheckInFormFieldCommentProperties) => {
  const commentEnabled = useRecoilValue(keyResultCheckInCommentEnabled(keyResultID))

  return commentEnabled ? (
    <CheckInFormFieldCommentInput submitOnBlur={submitOnBlur} />
  ) : (
    <CheckInFormFieldCommentEnableButton keyResultID={keyResultID} />
  )
}

export default CheckInFormFieldComment
