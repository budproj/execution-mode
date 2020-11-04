import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'

import PageContentHeader from 'components/Base/PageContentHeader'

export interface PageContentProps {
  children: ReactElement
}

const PageContent = (props: PageContentProps): ReactElement => (
  <Box py={3} px={4}>
    <PageContentHeader />
    {props.children}
  </Box>
)

export default PageContent
