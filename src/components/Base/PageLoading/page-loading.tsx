import { Spinner, Flex } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

const PageLoading = (): ReactElement => (
  <Flex height="100vh" justifyContent="center" alignItems="center">
    <Spinner size="xl" color="brand.400" />
  </Flex>
)

export default PageLoading
