import { Box, Flex } from '@chakra-ui/react'
import orderBy from 'lodash/orderBy'
import React from 'react'

import { TaskComment } from 'src/services/task-management/@types/task-comment.type'
import { TaskHistory } from 'src/services/task-management/@types/task-history.type'

import { TaskCommentComponent } from './TaskComment'
import { TaskUpdateComponent } from './TaskUpdate'

interface TasProperties {
  readonly comments: TaskComment[]
  readonly updates: TaskHistory[]
}

export const TimelineWrapper = ({ comments, updates }: TasProperties) => {
  const timeline = orderBy([...comments, ...updates], 'createdAt', 'desc')

  return (
    <Flex flexDir="column" gap={4}>
      {timeline.map((item) => (
        <Box key={item.id}>
          {'text' in item && <TaskCommentComponent key={item.id} comment={item} />}
          {'newState' in item && <TaskUpdateComponent key={item.id} taskUpdate={item} />}
        </Box>
      ))}
    </Flex>
  )
}
