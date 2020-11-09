import { Box } from '@material-ui/core'
import React, { ComponentType, ReactElement } from 'react'

import PageContentHeader from 'components/Base/PageContentHeader'

export interface PageContentProps {
  children: ReactElement
  RightWing?: ComponentType
}

const PageContent = (props: PageContentProps): ReactElement => (
  <Box py={3} px={4}>
    <PageContentHeader RightWing={props.RightWing} />
    {props.children}
  </Box>
)

export default PageContent
