import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import MainAppBar from 'src/components/Base/MainAppBar'

import { MainAppBarVariant } from '../MainAppBar/main-app-bar'

export interface PageProperties extends BoxProps {
  children: ReactElement | ReactElement[]
  appBarVariant?: MainAppBarVariant
}

const Page = ({ children, appBarVariant, ...rest }: PageProperties): ReactElement => (
  <Box {...rest}>
    <MainAppBar variant={appBarVariant} />
    {children}
  </Box>
)

export default Page
