import React from 'react'

import KeyResultSectionTimelineCardCommentAndFeedbacks from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Comment/comment'
import { KeyResultComment } from 'src/components/KeyResult/types'
import { Comment } from 'src/components/Routine/RetrospectiveTab/Comments/types'
import { User } from 'src/components/User/types'

interface TaskCommentProperties {
  readonly comment: Comment
}

export const TaskCommentComponent = ({ comment }: TaskCommentProperties) => {
  const formattedComment: Partial<KeyResultComment> = {
    id: comment?.id,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    user: { id: comment.userId } as User,
    text: comment?.content,
    createdAt: comment?.createdAt.toLocaleString(),
  }

  return comment && <KeyResultSectionTimelineCardCommentAndFeedbacks data={formattedComment} />
}
