import React, { ReactElement } from 'react'
import { Box } from '@material-ui/core'

import { TemplateProps } from './types'

import AppBar from 'components/Layout/AppBar'
import PageTitle from 'components/Layout/PageTitle'

const Template = (props: TemplateProps): ReactElement => (
  <Box py={3} px={4}>
    <AppBar />
    <PageTitle />
    {props.children}
  </Box>
)

export default Template
