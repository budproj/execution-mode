import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import AppBar from 'src/components/Base/AppBar'

export interface PageProperties {
  children: ReactElement
}

const Page = (properties: PageProperties): ReactElement => (
  <Box>
    <AppBar />
    {properties.children}
  </Box>
)

export default Page
