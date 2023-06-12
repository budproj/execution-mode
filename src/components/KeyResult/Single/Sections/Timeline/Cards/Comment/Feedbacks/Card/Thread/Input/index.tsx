import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

import KeyResultSectionAddComment from 'src/components/KeyResult/Single/Sections/AddComment'
import { KeyResult, KeyResultComment } from 'src/components/KeyResult/types'

interface CommentThreadInput {
  keyResultID: KeyResult['id']
  parentId: KeyResultComment['id']
}

const CommentThreadInput = ({ keyResultID, parentId }: CommentThreadInput) => {
  const [isOpenThread, setIsOpenThread] = useState(false)

  const handleOpenThread = () => setIsOpenThread(true)

  return (
    <Box pt={4}>
      {isOpenThread ? (
        <KeyResultSectionAddComment keyResultID={keyResultID} parentCommentId={parentId} />
      ) : (
        <Button
          position="absolute"
          bottom={1}
          right={2}
          bg="none"
          color="brand.500"
          onClick={handleOpenThread}
        >
          <text style={{ borderBottom: '1px solid' }}>Responder</text>
        </Button>
      )}
    </Box>
  )
}

export default CommentThreadInput
