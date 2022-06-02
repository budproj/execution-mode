import { HeadingProps, Heading } from '@chakra-ui/react'
import React from 'react'

export const TeamSectionHeading = (properties: HeadingProps) => (
  <Heading
    as="h2"
    color="gray.500"
    fontSize="sm"
    fontWeight={700}
    textTransform="uppercase"
    {...properties}
  />
)
