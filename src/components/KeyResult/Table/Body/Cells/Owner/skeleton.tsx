import { Box } from '@material-ui/core'
import Skeleton, { SkeletonProps } from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

import { StyledSkeletonCell } from 'components/KeyResult/Table/Body/skeleton'

export const SkeletonPicture = (properties: SkeletonProps): ReactElement => (
  <Skeleton variant="circle" width={40} height={40} {...properties} />
)

const OwnerSkeleton = (): ReactElement => (
  <StyledSkeletonCell>
    <Box display="flex" justifyContent="flex-end">
      <SkeletonPicture />
    </Box>
  </StyledSkeletonCell>
)

export default OwnerSkeleton
