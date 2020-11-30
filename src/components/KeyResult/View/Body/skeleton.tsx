import { Box, Grid } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { GRID_TEMPLATE_COLUMN, BORDER_COLOR } from 'src/components/KeyResult/View/constants'

import {
  KeyResultViewBodyColumnCycle,
  KeyResultViewBodyColumnOkr,
  KeyResultViewBodyColumnOwner,
  KeyResultViewBodyColumnProgress,
  KeyResultViewBodyColumnStatus,
  KeyResultViewBodyColumnTitle,
} from './Columns'

export interface ListSkeletonProperties {
  amountOfLines: number
}

const Skeleton = ({ amountOfLines }: ListSkeletonProperties): ReactElement => (
  <Box>
    {[...new Array(amountOfLines).keys()].map((key) => (
      <Grid
        key={`skeleton-line-${key}`}
        templateColumns={GRID_TEMPLATE_COLUMN}
        borderBottom={1}
        borderStyle="solid"
        borderColor={BORDER_COLOR}
        alignItems="center"
      >
        <KeyResultViewBodyColumnTitle />
        <KeyResultViewBodyColumnOkr />
        <KeyResultViewBodyColumnStatus />
        <KeyResultViewBodyColumnProgress />
        <KeyResultViewBodyColumnCycle />
        <KeyResultViewBodyColumnOwner />
      </Grid>
    ))}
  </Box>
)

Skeleton.defaultProps = {
  amountOfLines: 4,
}

export default Skeleton
