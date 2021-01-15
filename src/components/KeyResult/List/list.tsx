import { Box, BoxProps, GridProps } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import logger from 'lib/logger'
import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResultListBodyProperties } from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBody from './Body'
import KeyResultListBodySkeleton from './Body/Skeleton'
import KeyResultListHead from './Head'
import { KeyResultListColumnHeadProperties } from './Head/types'
import {
  BORDER_COLOR_DEFAULT,
  COLUMNS_DEFAULT,
  LIST_TEMPLATE_COLUMN_DEFAULT,
  KEY_RESULT_LIST_TYPE,
} from './constants'

export interface KeyResultListProperties extends BoxProps {
  id: string
  columns: KEY_RESULT_LIST_BODY_COLUMN[]
  templateColumns: GridProps['templateColumns']
  bodyProperties: KeyResultListBodyProperties
  headProperties: KeyResultListColumnHeadProperties
  borderColor: GridProps['borderColor']
  type: KEY_RESULT_LIST_TYPE
  keyResultIDs?: Array<KeyResult['id']>
  onLineClick?: (id: KeyResult['id']) => void
  onLineDragEnd?: (result: DropResult) => void
}

const KeyResultList = ({
  keyResultIDs,
  onLineClick,
  onLineDragEnd,
  type,
  templateColumns,
  borderColor,
  columns,
  bodyProperties,
  headProperties,
  id,
  ...rest
}: KeyResultListProperties): ReactElement => {
  const throwHandleDragEndError = () => {
    if (type === KEY_RESULT_LIST_TYPE.DND)
      logger.error(
        'You must provide a handleDragError property to KeyResultList work as type DND',
        { component },
      )
  }

  return (
    <Box {...rest}>
      {(!keyResultIDs || keyResultIDs.length > 0) && (
        <KeyResultListHead
          columns={columns}
          templateColumns={templateColumns}
          headProperties={headProperties}
          borderColor={borderColor}
        />
      )}
      {keyResultIDs ? (
        <KeyResultListBody
          listID={id}
          type={type}
          columns={columns}
          templateColumns={templateColumns}
          bodyProperties={bodyProperties}
          borderColor={borderColor}
          keyResultIDs={keyResultIDs}
          handleDragEnd={onLineDragEnd ?? throwHandleDragEndError}
          onLineClick={onLineClick}
        />
      ) : (
        <KeyResultListBodySkeleton
          listID={id}
          columns={columns}
          borderColor={borderColor}
          templateColumns={templateColumns}
          bodyProperties={bodyProperties}
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
  bodyProperties: {},
  headProperties: {},
  id: uniqueId(),
}

export default KeyResultList
