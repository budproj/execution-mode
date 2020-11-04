import Box from '@material-ui/core/Box'
import React, { ComponentType, ReactElement } from 'react'

import Breadcrumb from 'components/Base/Breadcrumb'
import PageTitle from 'components/Base/PageTitle'

export interface PageContentHeaderProps {
  RightWing?: ComponentType
}

const PageContentHeader = ({ RightWing }: PageContentHeaderProps): ReactElement => (
  <Box>
    <Breadcrumb />

    <Box display={'grid'} gridTemplateColumns={'1fr 2fr'} alignItems={'flex-end'} py={1}>
      <PageTitle />
      {RightWing && (
        <Box display={'flex'} justifyContent={'flex-end'}>
          <RightWing />
        </Box>
      )}
    </Box>
  </Box>
)

export default PageContentHeader
