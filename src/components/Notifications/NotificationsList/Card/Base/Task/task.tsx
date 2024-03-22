import { Flex, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'

interface TaskInlineProperties {
  TaskTitle?: string
}

const TaskInline = ({ TaskTitle }: TaskInlineProperties) => {
  return (
    <Tooltip label={TaskTitle} minWidth="max-content" placement="top-start">
      <Flex alignItems="center" gap={2}>
        <Text
          cursor="default"
          color="new-gray.800"
          fontWeight="bold"
          fontSize={14}
          noOfLines={1}
          textAlign="left"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {TaskTitle}
        </Text>
      </Flex>
    </Tooltip>
  )
}

export default TaskInline
