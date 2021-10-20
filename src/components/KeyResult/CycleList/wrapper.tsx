import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { cycleAtomFamily } from 'src/state/recoil/cycle'

import { CycleKeyResultList } from './cycle-key-result-list'

export interface KeyResultCycleListProperties {
  isActive: boolean
  id?: Cycle['id']
  isDisabled?: boolean
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultCycleList = ({
  id,
  isActive,
  isDisabled,
  onLineClick,
}: KeyResultCycleListProperties) => {
  const cycle = useRecoilValue(cycleAtomFamily(id))
  const [keyResults, setKeyResultEdges] = useConnectionEdges<KeyResult>()

  const isCycleLoaded = Boolean(cycle)
  const isCycleKeyResultsLoaded = cycle?.keyResults?.edges.length === keyResults.length
  const isLoaded = isCycleLoaded && isCycleKeyResultsLoaded
  const keyResultIDs = keyResults.map((keyResult) => keyResult.id)

  useEffect(() => {
    if (cycle) setKeyResultEdges(cycle?.keyResults?.edges)
  }, [cycle, setKeyResultEdges])

  return (
    <CycleKeyResultList
      cycle={cycle}
      isLoaded={isLoaded}
      keyResultIDs={keyResultIDs}
      isActive={isActive}
      isDisabled={isDisabled}
      onLineClick={onLineClick}
    />
  )
}

KeyResultCycleList.defaultProps = {
  isActive: true,
}

export default KeyResultCycleList
