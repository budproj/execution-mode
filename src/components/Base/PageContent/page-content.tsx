import { Box } from '@chakra-ui/react'
import React, { ComponentType, ReactElement } from 'react'

import PageContentHeader from 'src/components/Base/PageContentHeader'

export interface PageContentProperties {
  children: ReactElement
  RightWing?: ComponentType
}

const PageContent = (properties: PageContentProperties): ReactElement => (
  <Box py={10} px={20}>
    <PageContentHeader RightWing={properties.RightWing} />
    {properties.children}
  </Box>
)

export default PageContent
