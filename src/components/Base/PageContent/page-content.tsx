import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

const PageContent = ({ children, ...rest }: BoxProps) => (
  <Box py={10} px={20} flexGrow={1} {...rest}>
    {children}
  </Box>
)

export default PageContent
