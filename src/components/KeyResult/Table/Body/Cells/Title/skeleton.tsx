import { styled, Box, TableCell } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'

import { styledSkeletonCellStyles } from 'components/KeyResult/Table/Body/skeleton'

const StyledSkeletonIcon = styled(Skeleton)({
  borderRadius: 10,
})

export const StyledSkeletonTitleCell = styled(TableCell)(({ theme }) => ({
  ...styledSkeletonCellStyles(theme),
  paddingLeft: 0,
}))

const TitleSkeleton = (): ReactElement => (
  <StyledSkeletonTitleCell>
    <Box display="flex" alignItems="center" gridGap={20}>
      <StyledSkeletonIcon variant="rect" width={61} height={61} />
      <Box width="70%">
        <Skeleton />
        <Skeleton width="50%" />
      </Box>
    </Box>
  </StyledSkeletonTitleCell>
)

export default TitleSkeleton
