import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultCheckInCommentEnabled } from 'src/state/recoil/key-result/check-in'

import CheckInFormFieldCommentEnableButton from './enable-button'
import CheckInFormFieldCommentInput from './input'

export interface CheckInFormFieldCommentProperties {
  keyResultID?: KeyResult['id']
}

const CheckInFormFieldComment = ({ keyResultID }: CheckInFormFieldCommentProperties) => {
  const commentEnabled = useRecoilValue(keyResultCheckInCommentEnabled(keyResultID))

  return commentEnabled ? (
    <CheckInFormFieldCommentInput />
  ) : (
    <CheckInFormFieldCommentEnableButton keyResultID={keyResultID} />
  )
}

export default CheckInFormFieldComment
