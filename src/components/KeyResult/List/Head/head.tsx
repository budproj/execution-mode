import { Grid, GridItem, GridProps, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'

import messages from './messages'
import { KeyResultListColumnHeadProperties } from './types'

export interface KeyResultListHeadProperties {
  borderColor: GridProps['borderColor']
  columns: KEY_RESULT_LIST_COLUMN[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  headProperties: KeyResultListColumnHeadProperties
}

const KeyResultListHead = ({
  borderColor,
  columns,
  templateColumns,
  columnGap,
  headProperties,
}: KeyResultListHeadProperties): ReactElement => {
  const intl = useIntl()
  const columnMessages = {
    [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: messages.listHeadKeyResult,
    [KEY_RESULT_LIST_COLUMN.OBJECTIVE]: messages.listHeadObjective,
    [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL]: messages.listHeadConfidenceLevel,
    [KEY_RESULT_LIST_COLUMN.PROGRESS]: messages.listHeadProgress,
    [KEY_RESULT_LIST_COLUMN.CYCLE]: messages.listHeadCycle,
    [KEY_RESULT_LIST_COLUMN.OWNER]: messages.listHeadOwner,
    [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL_COLOR]: messages.listHeadConfidenceLevelColor,
    [KEY_RESULT_LIST_COLUMN.PERCENTUAL_PROGRESS]: messages.listHeadPercentualProgress,
  }

  return (
    <Grid
      pb={4}
      fontWeight={500}
      borderBottom={1}
      borderColor={borderColor}
      borderStyle="solid"
      templateColumns={templateColumns}
      gridColumnGap={columnGap}
    >
      {columns.map((column) => {
        const columnProperties = headProperties[column]

        return (
          <GridItem
            key={`KEY_RESULT_LIST_HEAD_COLUMN_${column}`}
            justifySelf={columnProperties?.justifySelf}
          >
            <Text hidden={columnProperties?.hidden} color="gray.300">
              {intl.formatMessage(columnMessages[column])}
            </Text>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default KeyResultListHead
