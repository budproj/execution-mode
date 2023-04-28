import { Box, BoxProps, GridProps } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { MessageDescriptor } from 'react-intl'

import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResultListBodyColumnProperties } from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { ObjectiveMode } from 'src/state/recoil/objective/context'

import KeyResultListBody from './Body'
import KeyResultListBodySkeleton from './Body/Skeleton'
import KeyResultListHead from './Head'
import { KeyResultListColumnHeadProperties } from './Head/types'
import {
  BORDER_COLOR_DEFAULT,
  COLUMNS_DEFAULT,
  GRID_COLUMN_GAP,
  GRID_TEMPLATE_COLUMNS,
  KEY_RESULT_LIST_TYPE,
} from './constants'

export interface KeyResultListProperties extends BoxProps {
  id: string
  columns: KEY_RESULT_LIST_COLUMN[]
  bodyProperties: KeyResultListBodyColumnProperties
  headProperties: KeyResultListColumnHeadProperties
  borderColor: GridProps['borderColor']
  type: KEY_RESULT_LIST_TYPE
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  emptyStateMessage?: MessageDescriptor
  keyResultIDs?: Array<KeyResult['id']>
  onLineClick?: (id: KeyResult['id']) => void
  onLineDragEnd?: (result: DropResult) => void
  isLoading?: boolean
  mode?: ObjectiveMode
}

const KeyResultList = ({
  id,
  keyResultIDs,
  onLineClick,
  onLineDragEnd,
  type,
  borderColor,
  columns,
  bodyProperties,
  headProperties,
  templateColumns,
  columnGap,
  isLoading,
  emptyStateMessage,
  mode,
  ...rest
}: KeyResultListProperties): ReactElement => (
  <Box {...rest}>
    <KeyResultListHead
      columns={columns}
      templateColumns={templateColumns}
      columnGap={columnGap}
      headProperties={headProperties}
      borderColor={borderColor}
      mode={mode}
    />
    {isLoading ? (
      <KeyResultListBodySkeleton
        listID={id}
        type={type}
        templateColumns={templateColumns}
        columnGap={columnGap}
        columns={columns}
        borderColor={borderColor}
        bodyProperties={bodyProperties}
        keyResultIDs={[]}
      />
    ) : (
      <KeyResultListBody
        listID={id}
        type={type}
        columns={columns}
        templateColumns={templateColumns}
        columnGap={columnGap}
        bodyProperties={bodyProperties}
        borderColor={borderColor}
        keyResultIDs={keyResultIDs}
        handleDragEnd={onLineDragEnd}
        emptyStateMessage={emptyStateMessage}
        mode={mode}
        onLineClick={onLineClick}
        {...rest}
      />
    )}
  </Box>
)

KeyResultList.defaultProps = {
  type: 'static',
  borderColor: BORDER_COLOR_DEFAULT,
  templateColumns: GRID_TEMPLATE_COLUMNS,
  columnGap: GRID_COLUMN_GAP,
  columns: COLUMNS_DEFAULT,
  bodyProperties: {},
  headProperties: {},
  id: uniqueId(),
}

export default KeyResultList
