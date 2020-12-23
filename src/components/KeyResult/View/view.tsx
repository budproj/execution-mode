import { useLazyQuery, useMutation } from '@apollo/client'
import { BoxProps } from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KeyResultListBodyColumn } from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResultListType } from 'src/components/KeyResult/List/types'
import {
  KeyResult,
  KeyResultViewBinding,
  KeyResultView as KeyResultViewType,
} from 'src/components/KeyResult/types'
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
          binding: KeyResultViewBinding.MINE,
        },
      })
  }, [called, getKeyResultViewForBinding])

  useEffect(() => {
    if (data) loadKeyResults(data.keyResultView.keyResults)
  }, [data, loadKeyResults])

  return (
    <KeyResultList
      handleDragEnd={handleDragEnd}
      type={KeyResultListType.DND}
      keyResultIDs={keyResultView?.rank}
      bodyProperties={{
        [KeyResultListBodyColumn.TITLE]: {
          withDynamicIcon: true,
          withRightBorder: true,
        },
        [KeyResultListBodyColumn.STATUS]: {
          withLastUpdateInfo: true,
        },
      }}
      onLineClick={onLineClick}
      {...rest}
    />
  )
}

export default KeyResultView
