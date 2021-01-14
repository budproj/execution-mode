import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'

import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResultListBodyProperties } from 'src/components/KeyResult/List/Body/Columns/types'
import KeyResultListBodyStaticLine from 'src/components/KeyResult/List/Body/Static/line'

export interface KeyResultListBodySkeletonProperties {
  listID: string
  amountOfLines: number
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KEY_RESULT_LIST_BODY_COLUMN[]
  bodyProperties: KeyResultListBodyProperties
}

const KeyResultListBodySkeleton = ({
  amountOfLines,
  ...rest
}: KeyResultListBodySkeletonProperties) => (
  <Box>
    {[...[...new Array(amountOfLines)].keys()].map((key) => (
      <KeyResultListBodyStaticLine key={`SKELETON_LINE_${key}`} {...rest} />
    ))}
  </Box>
)

KeyResultListBodySkeleton.defaultProps = {
  amountOfLines: 4,
}

export default KeyResultListBodySkeleton
