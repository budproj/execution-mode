import React, { ReactElement } from 'react'
import { Box } from '@material-ui/core'

import AppBar from 'components/Base/AppBar'
import PageTitle from 'components/Base/PageTitle'

export interface TemplateProps {
  children: ReactElement
}

const Template = (props: TemplateProps): ReactElement => (
  <Box py={3} px={4}>
    <AppBar />
    <PageTitle />
    {props.children}
  </Box>
)

export default Template
