import { CircularProgress, Flex } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

const PageLoading = (): ReactElement => (
  <Flex height="100vh" justifyContent="center" alignItems="center">
    <CircularProgress isIndeterminate size="60px" thickness="4px" />
  </Flex>
)

export default PageLoading
