import Box from '@material-ui/core/Box'
import React, { ReactElement } from 'react'

import Breadcrumb from 'components/Base/Breadcrumb'
import PageTitle from 'components/Base/PageTitle'

const PageContentHeader = (): ReactElement => (
  <Box>
    <Breadcrumb />

    <Box display={'grid'} gridTemplateColumns={'1fr 2fr'} py={1}>
      <PageTitle />
    </Box>
  </Box>
)

export default PageContentHeader
