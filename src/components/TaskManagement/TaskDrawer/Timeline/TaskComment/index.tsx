import React from 'react'

import { TaskComment } from 'src/services/task-management/@types/task-comment.type'

import TaskTimelineCardComment from '../Card'

interface TaskCommentProperties {
  readonly comment: TaskComment
}

export const TaskCommentComponent = ({ comment }: TaskCommentProperties) => {
  return comment && <TaskTimelineCardComment data={comment} />
}
