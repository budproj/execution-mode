import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

import { StyledSkeletonCell } from 'components/KeyResult/Table/Body/skeleton'

const TitleSkeleton = (): ReactElement => (
  <StyledSkeletonCell>
    <Box display="flex" gridGap={20}>
      <Skeleton width="70%" />
      <Skeleton width="10%" />
    </Box>
  </StyledSkeletonCell>
)

export default TitleSkeleton
