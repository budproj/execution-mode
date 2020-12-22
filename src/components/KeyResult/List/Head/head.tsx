import { Grid, GridItem, GridProps, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultListBodyColumn } from 'src/components/KeyResult/List/Body/Columns/types'

import messages from './messages'
import { KeyResultListColumnHeadProperties } from './types'

export interface KeyResultListHeadProperties {
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
  headProperties: KeyResultListColumnHeadProperties
}

const KeyResultListHead = ({
  templateColumns,
  borderColor,
  columns,
  headProperties,
}: KeyResultListHeadProperties): ReactElement => {
  const intl = useIntl()
  const columnMessages = {
    [KeyResultListBodyColumn.TITLE]: messages.listHeadTitle,
    [KeyResultListBodyColumn.OKR]: messages.listHeadOKR,
    [KeyResultListBodyColumn.STATUS]: messages.listHeadStatus,
    [KeyResultListBodyColumn.PROGRESS]: messages.listHeadProgress,
    [KeyResultListBodyColumn.CYCLE]: messages.listHeadDate,
    [KeyResultListBodyColumn.OWNER]: messages.listHeadOwner,
    [KeyResultListBodyColumn.STATUS_COLOR]: messages.listHeadStatusColor,
  }

  return (
    <Grid
      templateColumns={templateColumns}
      pb={4}
      color="gray.400"
      fontWeight={500}
      borderBottom={1}
      borderColor={borderColor}
      borderStyle="solid"
    >
      {columns.map((column) => {
        const columnProperties = headProperties[column]

        return (
          <GridItem
            key={`KEY_RESULT_LIST_HEAD_COLUMN_${column}`}
            px={columnProperties?.hidden ? 0 : 4}
          >
            <Text hidden={columnProperties?.hidden}>
              {intl.formatMessage(columnMessages[column])}
            </Text>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default KeyResultListHead
