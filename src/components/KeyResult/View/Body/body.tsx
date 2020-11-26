import { useQuery } from '@apollo/client'
import React, { ReactElement, useEffect } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'

import { KeyResult, KeyResultViewBinding } from 'components/KeyResult/types'
import logger from 'lib/logger'
import { keyResultViewAtom } from 'state/recoil/key-result'

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
import DroppableBox from './droppable-box'
import queries from './queries.gql'
import Skeleton from './skeleton'

const component = 'KeyResultViewBody'

const KeyResultViewBody = (): ReactElement => {
  const [keyResultView, setKeyResultView] = useRecoilState(keyResultViewAtom)
  const { loading, data } = useQuery(queries.KeyResultViewForBinding, {
    variables: {
      binding: KeyResultViewBinding.MINE,
    },
  })
  const isLocalStateUpdated = keyResultView === data?.keyResultView

  logger.debug('Rerendered Key Result View body. Take a look at our new data:', {
    component,
    data: {
      data,
      loading,
      keyResultView,
    },
  })

  useEffect(() => {
    if (!loading && data) setKeyResultView(data.keyResultView)
  }, [loading, data, setKeyResultView])

  const handleDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? console.log(source, destination)
      : keyResultView

  return !loading && isLocalStateUpdated ? (
    <DroppableBox onDragEnd={handleDragEnd}>
      {keyResultView?.keyResults.map((keyResult: KeyResult, index: number) => (
        <DraggableGrid
          key={keyResult.id}
          id={keyResult.id}
          index={index}
          alignItems="center"
          templateColumns={GRID_TEMPLATE_COLUMN}
          border={1}
          borderColor="transparent"
          borderStyle="solid"
          borderBottomColor={BORDER_COLOR}
          _hover={{ background: 'blue.50' }}
        >
          <KeyResultViewBodyColumnTitle keyResult={keyResult} />
          <KeyResultViewBodyColumnOkr keyResult={keyResult} />
          <KeyResultViewBodyColumnStatus keyResult={keyResult} />
          <KeyResultViewBodyColumnProgress keyResult={keyResult} />
          <KeyResultViewBodyColumnCycle keyResult={keyResult} />
          <KeyResultViewBodyColumnOwner keyResult={keyResult} />
        </DraggableGrid>
      ))}
    </DroppableBox>
  ) : (
    <Skeleton />
  )
}

export default KeyResultViewBody
