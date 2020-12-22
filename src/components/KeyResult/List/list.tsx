import { Box, BoxProps, GridProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import logger from 'lib/logger'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBody from './Body'
import KeyResultListBodySkeleton from './Body/Skeleton'
import KeyResultListHead from './Head'
import { BORDER_COLOR_DEFAULT, COLUMNS_DEFAULT, LIST_TEMPLATE_COLUMN_DEFAULT } from './constants'
import { KeyResultListBodyColumn, KeyResultListType } from './types'

export interface KeyResultListProperties extends BoxProps {
  columns: KeyResultListBodyColumn[]
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  type: KeyResultListType
  keyResultIDs?: Array<KeyResult['id']>
  onLineClick?: (id: KeyResult['id']) => void
  handleDragEnd?: (result: DropResult) => void
}

const KeyResultList = ({
  keyResultIDs,
  onLineClick,
  handleDragEnd,
  type,
  templateColumns,
  borderColor,
  columns,
  ...rest
}: KeyResultListProperties): ReactElement => {
  const throwHandleDragEndError = () => {
    if (type === KeyResultListType.DND)
      logger.error(
        'You must provide a handleDragError property to KeyResultList work as type DND',
        { component },
      )
  }

  return (
    <Box {...rest}>
      <KeyResultListHead
        columns={columns}
        templateColumns={templateColumns}
        borderColor={borderColor}
      />
      {keyResultIDs ? (
        <KeyResultListBody
          type={type}
          columns={columns}
          templateColumns={templateColumns}
          borderColor={borderColor}
          keyResultIDs={keyResultIDs}
          handleDragEnd={handleDragEnd ?? throwHandleDragEndError}
          onLineClick={onLineClick}
        />
      ) : (
        <KeyResultListBodySkeleton
          columns={columns}
          borderColor={borderColor}
          templateColumns={templateColumns}
        />
      )}
    </Box>
  )
}

const component = KeyResultList.name

KeyResultList.defaultProps = {
  type: 'static',
  templateColumns: LIST_TEMPLATE_COLUMN_DEFAULT,
  borderColor: BORDER_COLOR_DEFAULT,
  columns: COLUMNS_DEFAULT,
}

export default KeyResultList
