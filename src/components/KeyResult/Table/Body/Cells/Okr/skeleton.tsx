import { styled, Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

import { StyledSkeletonCell } from 'components/KeyResult/Table/Body/skeleton'

const StyledSkeletonIcon = styled(Skeleton)({
  borderRadius: 10,
})

const OkrSkeleton = (): ReactElement => (
  <StyledSkeletonCell>
    <Box display="flex" alignItems="center" gridGap={20}>
      <StyledSkeletonIcon variant="rect" width={61} height={61} />
      <Skeleton width="50%" />
    </Box>
  </StyledSkeletonCell>
)

export default OkrSkeleton
