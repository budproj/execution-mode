import React, { ReactElement } from 'react'
import Container from '@material-ui/core/Container'

import { TemplateProps } from './interfaces'

const Template = (props: TemplateProps): ReactElement => <Container>{props.children}</Container>

export default Template
