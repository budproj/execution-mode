import { Flex } from '@chakra-ui/react'
import React from 'react'

import { Comment } from 'src/components/Routine/RetrospectiveTab/Comments/types'

interface TasProperties {
  readonly comment: Comment
}

export const TimelineWrapper = ({ comment }: TasProperties) => {
  return <Flex>teste</Flex>
}
