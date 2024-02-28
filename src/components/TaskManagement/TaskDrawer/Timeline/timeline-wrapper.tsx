import { Box, Flex } from '@chakra-ui/react'
import orderBy from 'lodash/orderBy'
import React from 'react'

import { Comment } from 'src/components/Routine/RetrospectiveTab/Comments/types'
import { TaskUpdate } from 'src/services/task-management/task-management.service'

import { TaskCommentComponent } from './TaskCommnet'
import { TaskUpdateComponent } from './TaskUpdate'

interface TasProperties {
  readonly comments: Comment[]
  readonly updates: TaskUpdate[]
}

const getKey = (item: any) => {
  return item.id ? item.id : item._id
}

export const TimelineWrapper = ({ comments, updates }: TasProperties) => {
  const timeline = orderBy([...comments, ...updates], 'createdAt', 'desc')

  return (
    <Flex flexDir="column" gap={4}>
      {timeline.map((item) => (
        <Box key={getKey(item)}>
          {'entity' in item && <TaskCommentComponent key={item.id} comment={item} />}
          {'taskId' in item && <TaskUpdateComponent key={item._id} taskUpdate={item} />}
        </Box>
      ))}
    </Flex>
  )
}
