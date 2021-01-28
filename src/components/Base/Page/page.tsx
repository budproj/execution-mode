import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import AppBar from 'src/components/Base/AppBar'

export interface PageProperties extends BoxProps {
  children: ReactElement | ReactElement[]
  hideAppBar?: boolean
}

const Page = ({ children, hideAppBar, ...rest }: PageProperties): ReactElement => (
  <Box {...rest}>
    {!hideAppBar && <AppBar />}
    {children}
  </Box>
)

export default Page
