import { Box, BoxProps } from '@chakra-ui/react'
import React, { ComponentType, ReactElement } from 'react'

import PageContentHeader from 'src/components/Base/PageContentHeader'

export interface PageContentProperties extends BoxProps {
  children?: ReactElement | ReactElement[]
  RightWing?: ComponentType
  contentTopGutter?: number
}

const PageContent = ({ RightWing, children, contentTopGutter, ...rest }: PageContentProperties) => (
  <Box py={10} px={20} {...rest}>
    <PageContentHeader RightWing={RightWing} />
    <Box pt={contentTopGutter}>{children}</Box>
  </Box>
)

PageContent.defaultProps = {
  contentTopGutter: 20,
}

export default PageContent
