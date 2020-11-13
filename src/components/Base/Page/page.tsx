import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'

import AppBar from 'components/Base/AppBar'

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
