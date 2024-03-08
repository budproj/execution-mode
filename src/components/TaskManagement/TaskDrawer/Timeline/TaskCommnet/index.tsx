import React from 'react'

import KeyResultSectionTimelineCardComment from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Comment/Default'
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

  return comment && <KeyResultSectionTimelineCardComment isFromTask data={formattedComment} />
}
