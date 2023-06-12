import React from 'react'

import { COMMENT_TYPE } from '../../../../../constants'
import { KeyResultComment } from '../../../../../types'

import KeyResultSectionTimelineCardComment from './Default/index'
import CommentFeedbacksCards from './Feedbacks/Card'

export interface KeyResultSectionTimelineCardCommentAndFeedbacksProperties {
  data?: Partial<KeyResultComment>
  onEntryDelete?: (entryType: string) => void
}
const defaultKeyResultComment = COMMENT_TYPE.COMMENT

const KeyResultSectionTimelineCardCommentAndFeedbacks = ({
  data,
  onEntryDelete,
}: KeyResultSectionTimelineCardCommentAndFeedbacksProperties) => {
  const keyResultCommentType = data?.type ?? defaultKeyResultComment
  const isThread = Boolean(data?.parentId)

  return isThread ? (
    <div style={{ display: 'none' }} />
  ) : keyResultCommentType === defaultKeyResultComment ? (
    <KeyResultSectionTimelineCardComment data={data} onEntryDelete={onEntryDelete} />
  ) : (
    <CommentFeedbacksCards data={data} />
  )
}

export default KeyResultSectionTimelineCardCommentAndFeedbacks
