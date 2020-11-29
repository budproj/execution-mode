import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import React, { ComponentType, ReactElement } from 'react'

import Breadcrumb from 'src/components/Base/Breadcrumb'
import PageTitle from 'src/components/Base/PageTitle'

export interface PageContentHeaderProperties {
  RightWing?: ComponentType
}

const PageContentHeader = ({ RightWing }: PageContentHeaderProperties): ReactElement => (
  <Box>
    <Breadcrumb />

    <Grid templateColumns="1fr 2fr" alignItems="flex-end" py={1}>
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

export default PageContentHeader
