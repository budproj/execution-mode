import { Box } from '@chakra-ui/react'
import React from 'react'

import SkeletonLine from './line'

export interface ListSkeletonBodyProperties {
  amountOfLines: number
}

const SkeletonBody = ({ amountOfLines }: ListSkeletonBodyProperties) => (
  <Box>
    {[...new Array(amountOfLines).keys()].map((key) => (
      <SkeletonLine key={`skeleton-line-${key}`} />
    ))}
  </Box>
)

SkeletonBody.defaultProps = {
  amountOfLines: 4,
}

export default SkeletonBody
