import { Box } from '@chakra-ui/react'
import React from 'react'

import { KeyResultComment } from 'src/components/KeyResult/types'

import KeyResultSectionTimelineCardComment from '../../../../Default'

interface SubCommentProperties {
  data: Partial<KeyResultComment>
}

const SubComment = ({ data }: SubCommentProperties) => {
  return (
    <Box w="100%">
      <KeyResultSectionTimelineCardComment isSubcomment data={data} />
    </Box>
  )
}

export default SubComment
