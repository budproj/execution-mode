import { Text, TextProps } from '@chakra-ui/layout'
import React from 'react'

export const StyledDescription = (properties: TextProps) => (
  <Text textAlign="center" fontWeight={400} color="gray.400" fontSize="lg" px={4} {...properties} />
)
