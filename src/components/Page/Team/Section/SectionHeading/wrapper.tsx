import { HeadingProps, Heading } from '@chakra-ui/react'
import React from 'react'

export const TeamSectionHeading = (properties: HeadingProps) => (
  <Heading
    {...properties}
    as="h2"
    color="gray.500"
    fontSize="sm"
    fontWeight={700}
    textTransform="uppercase"
  />
)
