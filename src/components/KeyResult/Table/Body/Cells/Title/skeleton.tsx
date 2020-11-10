import { styled, Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

import { StyledSkeletonCell } from 'components/KeyResult/Table/Body/skeleton'

const StyledSkeletonIcon = styled(Skeleton)({
  borderRadius: 10,
})

const TitleSkeleton = (): ReactElement => (
  <StyledSkeletonCell>
    <Box display="flex" alignItems="center" gridGap={20}>
      <StyledSkeletonIcon variant="rect" width={55} height={55} />
      <Box width="70%">
        <Skeleton />
        <Skeleton width="50%" />
      </Box>
    </Box>
  </StyledSkeletonCell>
)

export default TitleSkeleton
