import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'

import { CyclesListBodyColumnStatusProperties } from './status'

const CyclesListBodyColumnStatusSkeleton = ({
  borderColor,
}: CyclesListBodyColumnStatusProperties): ReactElement => (
  <CyclesListBodyColumnBase
    borderColor={borderColor}
    borderStyle="solid"
    pr={2}
    h="full"
    alignItems="center"
    display="flex"
  >
    status skeleton
  </CyclesListBodyColumnBase>
)

export default CyclesListBodyColumnStatusSkeleton
