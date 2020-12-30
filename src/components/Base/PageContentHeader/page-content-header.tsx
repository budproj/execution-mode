import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import React, { ComponentType } from 'react'

import Breadcrumb from 'src/components/Base/Breadcrumb'
import { BreadcrumbProperties } from 'src/components/Base/Breadcrumb/breadcrumb'
import PageTitle from 'src/components/Base/PageTitle'

export interface PageContentHeaderProperties {
  RightWing?: ComponentType
  breadcrumbParams?: BreadcrumbProperties['routeParams']
  showBreadcrumb?: boolean
}

const PageContentHeader = ({
  RightWing,
  breadcrumbParams,
  showBreadcrumb,
}: PageContentHeaderProperties) => (
  <Box>
    {showBreadcrumb && <Breadcrumb routeParams={breadcrumbParams} />}

    <Grid templateColumns="2fr 1fr" alignItems="flex-end" py={1}>
      <GridItem>
        <PageTitle />
      </GridItem>

      {RightWing && (
        <GridItem>
          <Flex justifyContent="flex-end">
            <RightWing />
          </Flex>
        </GridItem>
      )}
    </Grid>
  </Box>
)

PageContentHeader.defaultProps = {
  showBreadcrumb: true,
}

export default PageContentHeader
