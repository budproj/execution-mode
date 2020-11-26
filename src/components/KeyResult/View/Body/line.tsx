import React, { ReactElement, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { KeyResult } from 'components/KeyResult/types'
import logger from 'lib/logger'
import { keyResultViewKeyResultAtomFamily } from 'state/recoil/key-result/view'

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

const component = 'KeyResultViewBodyLine'

export interface LineProperties {
  id: KeyResult['id']
  remoteKeyResult: KeyResult
  index: number
}

const Line = ({ id, index, remoteKeyResult }: LineProperties): ReactElement => {
  const [keyResult, setKeyResult] = useRecoilState(keyResultViewKeyResultAtomFamily(id))

  useEffect(() => {
    if (!keyResult && remoteKeyResult) setKeyResult(remoteKeyResult)
  }, [keyResult, remoteKeyResult, setKeyResult])

  logger.debug('Rerendered Key Result View body line. Take a look at our new data:', {
    component,
    data: {
      keyResult,
    },
  })

  return (
    <DraggableGrid
      id={id}
      index={index}
      alignItems="center"
      templateColumns={GRID_TEMPLATE_COLUMN}
      border={0}
      borderColor="transparent"
      borderStyle="solid"
      borderBottomColor={BORDER_COLOR}
      _hover={{ background: 'blue.49' }}
    >
      <KeyResultViewBodyColumnTitle id={id} />
      <KeyResultViewBodyColumnOkr id={id} />
      <KeyResultViewBodyColumnStatus id={id} />
      <KeyResultViewBodyColumnProgress id={id} />
      <KeyResultViewBodyColumnCycle id={id} />
      <KeyResultViewBodyColumnOwner id={id} />
    </DraggableGrid>
  )
}

export default Line
