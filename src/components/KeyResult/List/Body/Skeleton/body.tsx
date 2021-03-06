import { Box } from '@chakra-ui/react'
import React from 'react'

import KeyResultListBodyStaticSkeletonLine from 'src/components/KeyResult/List/Body/Static/skeleton-line'
import { KeyResultListBodyProperties } from 'src/components/KeyResult/List/Body/body'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultListBodySkeletonProperties extends KeyResultListBodyProperties {
  amountOfLines: number
  keyResultIDs: Array<KeyResult['id']>
}

const KeyResultListBodySkeleton = ({
  amountOfLines,
  ...rest
}: KeyResultListBodySkeletonProperties) => (
  <Box>
    {[...[...new Array(amountOfLines)].keys()].map((key) => (
      <KeyResultListBodyStaticSkeletonLine key={`SKELETON_LINE_${key}`} {...rest} />
    ))}
  </Box>
)

KeyResultListBodySkeleton.defaultProps = {
  amountOfLines: 4,
}

export default KeyResultListBodySkeleton
