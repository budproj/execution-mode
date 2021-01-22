import { Box, BoxProps, GridProps } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResultListBodyColumnProperties } from 'src/components/KeyResult/List/Body/Columns/types'
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
  bodyProperties: KeyResultListBodyColumnProperties
  headProperties: KeyResultListColumnHeadProperties
  borderColor: GridProps['borderColor']
  type: KEY_RESULT_LIST_TYPE
  keyResultIDs?: Array<KeyResult['id']>
  onLineClick?: (id: KeyResult['id']) => void
  onLineDragEnd?: (result: DropResult) => void
  isLoading?: boolean
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
  isLoading,
  id,
  ...rest
}: KeyResultListProperties): ReactElement => (
  <Box {...rest}>
    <KeyResultListHead
      columns={columns}
      templateColumns={templateColumns}
      headProperties={headProperties}
      borderColor={borderColor}
    />
    {isLoading ? (
      <KeyResultListBodySkeleton
        listID={id}
        type={type}
        columns={columns}
        borderColor={borderColor}
        templateColumns={templateColumns}
        bodyProperties={bodyProperties}
        keyResultIDs={[]}
      />
    ) : (
      <KeyResultListBody
        listID={id}
        type={type}
        columns={columns}
        templateColumns={templateColumns}
        bodyProperties={bodyProperties}
        borderColor={borderColor}
        keyResultIDs={keyResultIDs}
        handleDragEnd={onLineDragEnd}
        onLineClick={onLineClick}
      />
    )}
  </Box>
)

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
