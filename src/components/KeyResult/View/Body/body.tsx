import { useQuery } from '@apollo/client'
import React, { ReactElement, useEffect } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'

import { KeyResult, KeyResultViewBinding } from 'components/KeyResult/types'
import logger from 'lib/logger'
import { keyResultViewRankAtom } from 'state/recoil/key-result/view'

import DroppableBox from './droppable-box'
import Line from './line'
import queries from './queries.gql'
import Skeleton from './skeleton'

const component = 'KeyResultViewBody'

const KeyResultViewBody = (): ReactElement => {
  const [rank, setRank] = useRecoilState(keyResultViewRankAtom)
  const { loading, data } = useQuery(queries.KeyResultViewForBinding, {
    variables: {
      binding: KeyResultViewBinding.MINE,
    },
  })

  logger.debug('Rerendered Key Result View body. Take a look at our new data:', {
    component,
    data: {
      data,
      loading,
      rank,
    },
  })

  useEffect(() => {
    if (!loading && data) setRank(data.keyResultView.rank)
  }, [loading, data, setRank])

  const updateRank = (from: DraggableLocation['index'], to: DraggableLocation['index']) => {
    const newCustomSorting = [...rank]
    const [movedID] = newCustomSorting.splice(from, 1)
    newCustomSorting.splice(to, 0, movedID)

    setRank(newCustomSorting)
    return newCustomSorting
  }

  const handleDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? updateRank(source.index, destination.index)
      : rank

  return !loading && rank.length > 0 ? (
    <DroppableBox onDragEnd={handleDragEnd}>
      {rank.map((keyResultID: KeyResult['id'], index: number) => (
        <Line
          key={`KEY_RESULT_VIEW_LINE-${keyResultID}`}
          id={keyResultID}
          index={index}
          remoteKeyResult={data.keyResultView.keyResults[index]}
        />
      ))}
    </DroppableBox>
  ) : (
    <Skeleton />
  )
}

export default KeyResultViewBody
