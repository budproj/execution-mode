import { useLazyQuery, useMutation } from '@apollo/client'
import React, { ReactElement, useEffect } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'

import logger from 'lib/logger'
import { KeyResult, KeyResultView, KeyResultViewBinding } from 'src/components/KeyResult/types'
import { keyResultViewAtom } from 'src/state/recoil/key-result/view'

import DroppableBox from './droppable-box'
import Line from './line'
import queries from './queries.gql'
import Skeleton from './skeleton'

const component = 'KeyResultViewBody'

export interface KeyResultViewBodyProperties {
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultViewBody = ({ onLineClick }: KeyResultViewBodyProperties): ReactElement => {
  const [keyResultView, setKeyResultView] = useRecoilState(keyResultViewAtom)
  const [updateRank] = useMutation(queries.UPDATE_RANK)
  const [getKeyResultViewForBinding, { loading, data, called }] = useLazyQuery(
    queries.KEY_RESULT_VIEW_FOR_BINDING,
  )

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

  useEffect(() => {
    if (!called)
      getKeyResultViewForBinding({
        variables: {
          binding: KeyResultViewBinding.MINE,
        },
      })
  }, [called, getKeyResultViewForBinding])

  const handleRankUpdate = async (
    from: DraggableLocation['index'],
    to: DraggableLocation['index'],
  ) => {
    const newRank = [...(keyResultView?.rank ?? [])]
    const [movedID] = newRank.splice(from, 1)
    newRank.splice(to, 0, movedID)

    const rankInput = {
      rank: newRank,
    }

    const newKeyResultView = {
      ...(keyResultView as KeyResultView),
      ...rankInput,
    }

    setKeyResultView(newKeyResultView)
    await updateRank({ variables: { id: keyResultView?.id, rankInput } })

    return newKeyResultView
  }

  const handleDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? handleRankUpdate(source.index, destination.index)
      : keyResultView?.rank

  return !loading && keyResultView ? (
    <DroppableBox onDragEnd={handleDragEnd}>
      {keyResultView.rank.map((keyResultID: KeyResult['id'], index: number) => (
        <Line
          key={`KEY_RESULT_VIEW_LINE-${keyResultID}`}
          id={keyResultID}
          index={index}
          remoteKeyResult={data.keyResultView.keyResults[index]}
          onLineClick={onLineClick}
        />
      ))}
    </DroppableBox>
  ) : (
    <Skeleton />
  )
}

export default KeyResultViewBody
