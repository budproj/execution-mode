import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'

import { KeyResultListBodyColumn } from '../../types'

import KeyResultListBodySkeletonLine from './line'

export interface KeyResultListBodySkeletonProperties {
  amountOfLines: number
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
}

const KeyResultListBodySkeleton = ({
  amountOfLines,
  ...rest
}: KeyResultListBodySkeletonProperties) => (
  <Box>
    {[...new Array(amountOfLines).keys()].map((key) => (
      <KeyResultListBodySkeletonLine key={`SKELETON_LINE_${key}`} {...rest} />
    ))}
  </Box>
)

KeyResultListBodySkeleton.defaultProps = {
  amountOfLines: 4,
}

export default KeyResultListBodySkeleton
