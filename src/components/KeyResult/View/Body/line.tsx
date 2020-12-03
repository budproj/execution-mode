import React, { ReactElement, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import logger from 'lib/logger'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

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

const component = 'KeyResultViewBodyLine'

export interface LineProperties {
  id: KeyResult['id']
  remoteKeyResult: KeyResult
  index: number
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultViewLine = ({
  id,
  index,
  remoteKeyResult,
  onLineClick,
}: LineProperties): ReactElement => {
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(id))

  useEffect(() => {
    if (!keyResult && remoteKeyResult) setKeyResult(remoteKeyResult)
  }, [keyResult, remoteKeyResult, setKeyResult])

  logger.debug('Rerendered Key Result View body line. Take a look at our new data:', {
    component,
    data: {
      keyResult,
    },
  })

  const isLoaded = typeof keyResult !== 'undefined'

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
