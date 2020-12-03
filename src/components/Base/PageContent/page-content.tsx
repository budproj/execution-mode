import { Box, BoxProps } from '@chakra-ui/react'
import React, { ComponentType, ReactElement } from 'react'

import PageContentHeader from 'src/components/Base/PageContentHeader'

export interface PageContentProperties extends BoxProps {
  children?: ReactElement | ReactElement[]
  RightWing?: ComponentType
}

const PageContent = ({ RightWing, children, ...rest }: PageContentProperties): ReactElement => (
  <Box py={10} px={20} {...rest}>
    <PageContentHeader RightWing={RightWing} />
    {children}
  </Box>
)

export default PageContent
