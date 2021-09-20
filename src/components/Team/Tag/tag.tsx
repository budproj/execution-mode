import { Tag, TagProps } from '@chakra-ui/react'
import React, { forwardRef, RefObject } from 'react'

const TeamTag = forwardRef(
  (
    properties: TagProps,
    reference:
      | string
      | ((instance: HTMLDivElement | null) => void)
      | RefObject<HTMLDivElement>
      | null,
  ) => (
    <Tag
      ref={reference}
      bg="new-gray.300"
      color="gray.500"
      textTransform="uppercase"
      fontWeight={500}
      fontSize="sm"
      borderRadius={4}
      p={2}
      {...properties}
    />
  ),
)

export default TeamTag
