import { Box, BoxProps } from '@chakra-ui/react'
import React, { ComponentType, ReactElement } from 'react'

import { BreadcrumbProperties } from 'src/components/Base/Breadcrumb/breadcrumb'
import PageContentHeader from 'src/components/Base/PageContentHeader'

export interface PageContentProperties extends BoxProps {
  children?: ReactElement | ReactElement[]
  RightWing?: ComponentType
  contentTopGutter?: number
  breadcrumbParams?: BreadcrumbProperties['routeParams']
  showBreadcrumb?: boolean
}

const PageContent = ({
  RightWing,
  children,
  contentTopGutter,
  breadcrumbParams,
  showBreadcrumb,
  ...rest
}: PageContentProperties) => (
  <Box py={10} px={20} {...rest}>
    <PageContentHeader
      RightWing={RightWing}
      breadcrumbParams={breadcrumbParams}
      showBreadcrumb={showBreadcrumb}
    />
    <Box pt={contentTopGutter}>{children}</Box>
  </Box>
)

PageContent.defaultProps = {
  contentTopGutter: 20,
}

export default PageContent
