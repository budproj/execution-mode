import { Grid, GridProps, SkeletonProps } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultListBodyColumnCycle,
  KeyResultListBodyColumnOkr,
  KeyResultListBodyColumnOwner,
  KeyResultListBodyColumnProgress,
  KeyResultListBodyColumnStatus,
  KeyResultListBodyColumnTitle,
} from 'src/components/KeyResult/List/Body/Columns'
import { KeyResultListBodyColumn } from 'src/components/KeyResult/List/types'

export interface KeyResultListBodySkeletonLineProperties extends SkeletonProps {
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
}

const KeyResultListBodySkeletonLine = ({
  templateColumns,
  borderColor,
  columns,
  ...rest
}: KeyResultListBodySkeletonLineProperties) => {
  const columnComponents = {
    [KeyResultListBodyColumn.TITLE]: KeyResultListBodyColumnTitle,
    [KeyResultListBodyColumn.OKR]: KeyResultListBodyColumnOkr,
    [KeyResultListBodyColumn.STATUS]: KeyResultListBodyColumnStatus,
    [KeyResultListBodyColumn.PROGRESS]: KeyResultListBodyColumnProgress,
    [KeyResultListBodyColumn.CYCLE]: KeyResultListBodyColumnCycle,
    [KeyResultListBodyColumn.OWNER]: KeyResultListBodyColumnOwner,
  }

  return (
    <Grid
      templateColumns={templateColumns}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      alignItems="center"
      {...rest}
    >
      {columns.map((column) => {
        const Component = columnComponents[column]

        return (
          <Component
            key={`KEY_RESULT_LIST_BODY_SKELETON_COLUMN_${column}`}
            borderColor={borderColor}
          />
        )
      })}
    </Grid>
  )
}

export default KeyResultListBodySkeletonLine
