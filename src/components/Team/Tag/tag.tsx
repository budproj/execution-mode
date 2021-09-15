import { Tag, TagProps } from '@chakra-ui/react'
import React from 'react'

const TeamTag = (properties: TagProps) => (
  <Tag
    bg="new-gray.300"
    color="gray.500"
    textTransform="uppercase"
    fontWeight={500}
    fontSize="sm"
    borderRadius={4}
    p={2}
    {...properties}
  />
)

export default TeamTag
