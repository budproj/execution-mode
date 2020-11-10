import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

import { StyledSkeletonCell } from 'components/KeyResult/Table/Body/skeleton'

const StatusSkeleton = (): ReactElement => (
  <StyledSkeletonCell>
    <Box display="flex" alignItems="flex-start" gridGap={10}>
      <Skeleton variant="circle" width={15} height={15} style={{ marginTop: 3 }} />
      <Box display="flex" alignItems="flex-start" width="100%" flexDirection="column">
        <Skeleton width="40%" />
        <Skeleton width="80%" />
      </Box>
    </Box>
  </StyledSkeletonCell>
)

export default StatusSkeleton
