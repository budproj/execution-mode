import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import AppBar from 'src/components/Base/AppBar'

import { AppBarVariant } from '../AppBar/app-bar'

export interface PageProperties extends BoxProps {
  children: ReactElement | ReactElement[]
  appBarVariant?: AppBarVariant
}

const Page = ({ children, appBarVariant, ...rest }: PageProperties): ReactElement => (
  <Box {...rest}>
    <AppBar variant={appBarVariant} />
    {children}
  </Box>
)

export default Page
