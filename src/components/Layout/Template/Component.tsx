import React, { ReactElement } from 'react'
import Container from '@material-ui/core/Container'

import { TemplateProps } from './types'

import AppBar from 'components/Layout/AppBar'

const Template = (props: TemplateProps): ReactElement => (
  <Container maxWidth={false} disableGutters>
    <AppBar />
    {props.children}
  </Container>
)

export default Template
