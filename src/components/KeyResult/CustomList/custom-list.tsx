import { useLazyQuery, useMutation } from '@apollo/client'
import { BoxProps } from '@chakra-ui/react'
import React, { ReactElement, useEffect, useState } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'
import {
  KeyResult,
  KeyResultCustomList as KeyResultCustomListType,
} from 'src/components/KeyResult/types'
import { KEY_RESULT_CUSTOM_LIST_BINDING } from 'src/components/User/constants'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultCustomListAtom } from 'src/state/recoil/key-result/custom-list'

import queries from './queries.gql'

export interface KeyResultCustomListProperties extends BoxProps {
  onLineClick?: (id: KeyResult['id']) => void
}

export interface GetKeyResultCustomListWithBindingQuery {
  keyResultCustomList: Partial<KeyResultCustomListType>
}

const KeyResultCustomList = ({
  onLineClick,
  ...rest
}: KeyResultCustomListProperties): ReactElement => {
  const [isLoading, setIsLoading] = useState(true)
  const [keyResultCustomList, setKeyResultCustomList] = useRecoilState(keyResultCustomListAtom)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [updateRank] = useMutation(queries.UPDATE_RANK)
  const [
    getKeyResultCustomListForBinding,
    { loading, data, called },
  ] = useLazyQuery<GetKeyResultCustomListWithBindingQuery>(queries.GET_KEY_RESULT_VIEW_WITH_BINDING)

  const handleRankUpdate = async (
    from: DraggableLocation['index'],
    to: DraggableLocation['index'],
  ) => {
    const newRank = [...(keyResultCustomList?.rank ?? [])]
    const [movedID] = newRank.splice(from, 1)
    newRank.splice(to, 0, movedID)

    const keyResultCustomListInput = {
      rank: newRank,
    }

    const newKeyResultCustomList = {
      ...(keyResultCustomList as KeyResultCustomListType),
      ...keyResultCustomListInput,
    }

    setKeyResultCustomList(newKeyResultCustomList)
    await updateRank({ variables: { id: keyResultCustomList?.id, keyResultCustomListInput } })

    return newKeyResultCustomList
  }

  const handleDragEnd = ({ source, destination }: DropResult) =>
    destination && destination.index !== source.index
      ? handleRankUpdate(source.index, destination.index)
      : keyResultCustomList?.rank

  useEffect(() => {
    if (!loading && data) {
      setKeyResultCustomList(data.keyResultCustomList)
      setIsLoading(false)
    }
  }, [loading, data, setKeyResultCustomList, setIsLoading])

  useEffect(() => {
    if (!called)
      getKeyResultCustomListForBinding({
        variables: {
          binding: KEY_RESULT_CUSTOM_LIST_BINDING.MINE,
        },
      })
  }, [called, getKeyResultCustomListForBinding])

  useEffect(() => {
    if (data) loadKeyResults(data.keyResultCustomList.keyResults)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <KeyResultList
      type={KEY_RESULT_LIST_TYPE.DND}
      keyResultIDs={keyResultCustomList?.rank}
      isLoading={isLoading}
      headProperties={{
        [KEY_RESULT_LIST_COLUMN.OWNER]: {
          justifySelf: 'flex-end',
        },
      }}
      bodyProperties={{
        [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: {
          withDynamicIcon: true,
          withRightBorder: true,
        },
        [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL]: {
          withLastUpdateInfo: true,
        },
        [KEY_RESULT_LIST_COLUMN.PROGRESS]: {
          canChange: true,
        },
        [KEY_RESULT_LIST_COLUMN.OWNER]: {
          justifyContent: 'flex-end',
        },
      }}
      onLineDragEnd={handleDragEnd}
      onLineClick={onLineClick}
      {...rest}
    />
  )
}

export default KeyResultCustomList
