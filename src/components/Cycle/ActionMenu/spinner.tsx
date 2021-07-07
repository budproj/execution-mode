import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export const ActionSpinner = () => (
  <Flex py={2} justifyContent="center" alignItems="center">
    <Spinner color="brand.500" size="lg" />
  </Flex>
)
