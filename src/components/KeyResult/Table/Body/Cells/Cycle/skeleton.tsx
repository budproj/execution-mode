import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

import { StyledSkeletonCell } from 'components/KeyResult/Table/Body/skeleton'

const CycleSkeleton = (): ReactElement => (
  <StyledSkeletonCell>
    <Box display="flex" gridGap={20}>
      <Skeleton width="20%" />
      <Skeleton width="20%" />
    </Box>
  </StyledSkeletonCell>
)

export default CycleSkeleton
