import React, { ReactElement } from 'react'

import { KeyResult } from 'src/components/KeyResult/types'

import { BORDER_COLOR, GRID_TEMPLATE_COLUMN } from '../constants'

import {
  KeyResultViewBodyColumnCycle,
  KeyResultViewBodyColumnOkr,
  KeyResultViewBodyColumnOwner,
  KeyResultViewBodyColumnProgress,
  KeyResultViewBodyColumnStatus,
  KeyResultViewBodyColumnTitle,
} from './Columns'
import DraggableGrid from './draggable-grid'
import SkeletonLine from './skeleton/line'

export interface LineProperties {
  id: KeyResult['id']
  index: number
  isLoaded?: boolean
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultViewLine = ({ id, index, isLoaded, onLineClick }: LineProperties): ReactElement => {
  const handleLineClick = () => {
    if (onLineClick) onLineClick(id)
  }

  return isLoaded ? (
    <DraggableGrid
      keyResultID={id}
      templateColumns={GRID_TEMPLATE_COLUMN}
      border={0}
      borderBottomWidth={1}
      index={index}
      alignItems="center"
      borderColor="transparent"
      borderBottomColor={BORDER_COLOR}
      borderStyle="solid"
      _hover={{ background: 'blue.50' }}
      cursor={onLineClick ? 'pointer' : 'auto'}
      onClick={handleLineClick}
    >
      <KeyResultViewBodyColumnTitle id={id} />
      <KeyResultViewBodyColumnOkr id={id} />
      <KeyResultViewBodyColumnStatus id={id} />
      <KeyResultViewBodyColumnProgress id={id} />
      <KeyResultViewBodyColumnCycle id={id} />
      <KeyResultViewBodyColumnOwner id={id} />
    </DraggableGrid>
  ) : (
    <SkeletonLine />
  )
}

export default KeyResultViewLine
