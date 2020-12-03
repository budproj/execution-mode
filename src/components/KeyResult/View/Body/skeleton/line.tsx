import { Grid } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultViewBodyColumnCycle,
  KeyResultViewBodyColumnOkr,
  KeyResultViewBodyColumnOwner,
  KeyResultViewBodyColumnProgress,
  KeyResultViewBodyColumnStatus,
  KeyResultViewBodyColumnTitle,
} from 'src/components/KeyResult/View/Body/Columns'
import { GRID_TEMPLATE_COLUMN, BORDER_COLOR } from 'src/components/KeyResult/View/constants'

const SkeletonLine = () => (
  <Grid
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
)

export default SkeletonLine
