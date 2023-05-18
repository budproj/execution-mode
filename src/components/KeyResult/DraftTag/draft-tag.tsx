import { Tag } from '@chakra-ui/react'
import React from 'react'

const DraftTag = () => {
  return (
    <Tag
      colorScheme="gray"
      textTransform="uppercase"
      fontSize="xs"
      p={2}
      borderRadius={4}
      bg="gray.50"
      color="gray.400"
    >
      Rascunho
    </Tag>
  )
}

export default DraftTag
