import { Flex, BoxProps } from '@chakra-ui/react'
import React from 'react'

const PageContent = ({ children, ...rest }: BoxProps) => (
  <Flex py={10} px={20} flexGrow={1} {...rest}>
    {children}
  </Flex>
)

export default PageContent
