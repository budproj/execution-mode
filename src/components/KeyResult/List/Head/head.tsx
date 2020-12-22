import { Grid, GridItem, GridProps, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultListBodyColumn } from 'src/components/KeyResult/List/Body/Columns/types'

import messages from './messages'

export interface KeyResultListHeadProperties {
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
}

const KeyResultListHead = ({
  templateColumns,
  borderColor,
  columns,
}: KeyResultListHeadProperties): ReactElement => {
  const intl = useIntl()
  const columnMessages = {
    [KeyResultListBodyColumn.TITLE]: messages.listHeadTitle,
    [KeyResultListBodyColumn.OKR]: messages.listHeadOKR,
    [KeyResultListBodyColumn.STATUS]: messages.listHeadStatus,
    [KeyResultListBodyColumn.PROGRESS]: messages.listHeadProgress,
    [KeyResultListBodyColumn.CYCLE]: messages.listHeadDate,
    [KeyResultListBodyColumn.OWNER]: messages.listHeadOwner,
  }
  const isFirstOrLast = (index: number) => index === 0 || index === columns.length - 1

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
      {columns.map((column, index) => (
        <GridItem key={`KEY_RESULT_LIST_HEAD_COLUMN_${column}`}>
          <Text pl={isFirstOrLast(index) ? 0 : 6}>
            {intl.formatMessage(columnMessages[column])}
          </Text>
        </GridItem>
      ))}
    </Grid>
  )
}

export default KeyResultListHead
