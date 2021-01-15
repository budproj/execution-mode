import { useLazyQuery, useMutation } from '@apollo/client'
import { BoxProps } from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'
import { KeyResult, KeyResultView as KeyResultViewType } from 'src/components/KeyResult/types'
import { KEY_RESULT_VIEW_BINDING } from 'src/components/User/constants'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultViewAtom } from 'src/state/recoil/key-result/view'

import queries from './queries.gql'

export interface KeyResultViewProperties extends BoxProps {
  onLineClick?: (id: KeyResult['id']) => void
}

export interface GetKeyResultViewWithBindingQuery {
  keyResultView: Partial<KeyResultViewType>
}

const KeyResultView = ({ onLineClick, ...rest }: KeyResultViewProperties): ReactElement => {
  const [keyResultView, setKeyResultView] = useRecoilState(keyResultViewAtom)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [updateRank] = useMutation(queries.UPDATE_RANK)
  const [
    getKeyResultViewForBinding,
    { loading, data, called },
  ] = useLazyQuery<GetKeyResultViewWithBindingQuery>(queries.GET_KEY_RESULT_VIEW_WITH_BINDING)

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
      ...(keyResultView as KeyResultViewType),
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

  useEffect(() => {
    if (!loading && data) setKeyResultView(data.keyResultView)
  }, [loading, data, setKeyResultView])

  useEffect(() => {
    if (!called)
      getKeyResultViewForBinding({
        variables: {
          binding: KEY_RESULT_VIEW_BINDING.MINE,
        },
      })
  }, [called, getKeyResultViewForBinding])

  useEffect(() => {
    if (data) loadKeyResults(data.keyResultView.keyResults)
  }, [data, loadKeyResults])

  return (
    <KeyResultList
      type={KEY_RESULT_LIST_TYPE.DND}
      keyResultIDs={keyResultView?.rank}
      bodyProperties={{
        [KEY_RESULT_LIST_BODY_COLUMN.KEY_RESULT]: {
          withDynamicIcon: true,
          withRightBorder: true,
        },
        [KEY_RESULT_LIST_BODY_COLUMN.CONFIDENCE_LEVEL]: {
          withLastUpdateInfo: true,
        },
        [KEY_RESULT_LIST_BODY_COLUMN.PROGRESS]: {
          canChange: true,
        },
      }}
      onLineDragEnd={handleDragEnd}
      onLineClick={onLineClick}
      {...rest}
    />
  )
}

export default KeyResultView
