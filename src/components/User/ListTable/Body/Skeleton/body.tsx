import { Box } from '@chakra-ui/react'
import React from 'react'

import CyclesListBodyStaticSkeletonLine from 'src/components/Cycle/List/Body/Static/skeleton-line'
import { CyclesListBodyProperties } from 'src/components/User/ListTable/Body/body'
import { Cycle } from 'src/components/Cycle/types'

export interface CyclesListBodySkeletonProperties extends CyclesListBodyProperties {
  amountOfLines: number
  cyclesIDs: Array<Cycle['id']>
}

const CyclesListBodySkeleton = ({ amountOfLines, ...rest }: CyclesListBodySkeletonProperties) => (
  <Box>
    {[...[...new Array(amountOfLines)].keys()].map((key) => (
      <CyclesListBodyStaticSkeletonLine key={`SKELETON_LINE_${key}`} {...rest} />
    ))}
  </Box>
)

CyclesListBodySkeleton.defaultProps = {
  amountOfLines: 4,
}

export default CyclesListBodySkeleton
