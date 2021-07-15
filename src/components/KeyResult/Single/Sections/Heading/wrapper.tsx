import { Heading } from '@chakra-ui/react'
import React from 'react'

import { KeyResultSectionHeadingProperties } from './interface'

export const KeyResultSectionHeading = ({ children }: KeyResultSectionHeadingProperties) => (
  <Heading as="h3" fontWeight={700} color="gray.500" fontSize="sm" textTransform="uppercase">
    {children}
  </Heading>
)
