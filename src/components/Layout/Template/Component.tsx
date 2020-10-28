import React, { ReactElement } from 'react'
import Container from '@material-ui/core/Container'

import AppBar from 'components/Layout/AppBar'
import { TemplateProps } from './types'

const Template = (props: TemplateProps): ReactElement => (
  <Container maxWidth={false} disableGutters>
    <AppBar />
    {props.children}
  </Container>
)

export default Template
