import { Text, SkeletonText } from '@chakra-ui/react'
import React from 'react'

export interface KeyResultSectionCommentsCommentBodyProperties {
  comment?: KeyResultCheckIn['comment']
}

const KeyResultSectionCommentsCommentBody = ({
  comment,
}: KeyResultSectionCommentsCommentBodyProperties) => {
  const isLoaded = Boolean(comment)

  return (
    <SkeletonText isLoaded={isLoaded} noOfLines={5} spacing={4}>
      <Text>{comment}</Text>
    </SkeletonText>
  )
}

export default KeyResultSectionCommentsCommentBody
