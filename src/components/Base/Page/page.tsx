import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import AppBar from 'src/components/Base/AppBar'

export interface PageProperties extends BoxProps {
  children: ReactElement | ReactElement[]
}

const Page = ({ children, ...rest }: PageProperties): ReactElement => (
  <Box {...rest}>
    <AppBar />
    {children}
  </Box>
)

export default Page
