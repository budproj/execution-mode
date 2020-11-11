import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'

import AppBar from 'components/Base/AppBar'

export interface PageProps {
  children: ReactElement
}

const Page = (props: PageProps): ReactElement => (
  <Box>
    <AppBar />

    {props.children}
  </Box>
)

export default Page
