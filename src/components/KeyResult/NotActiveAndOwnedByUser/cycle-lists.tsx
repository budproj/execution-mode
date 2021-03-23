import React from 'react'

import { EmptyState } from 'src/components/Base'
import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultCycleList from '../CycleList'

import messages from './messages'

export interface KeyResultNotActiveAndOwnedByUserCyclesListProperties {
  cycles: Array<{
    id: Cycle['id']
    keyResults?: Cycle['keyResults']
  }>
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultNotActiveAndOwnedByUserCyclesList = ({
  cycles,
  onLineClick,
}: KeyResultNotActiveAndOwnedByUserCyclesListProperties) => {
  const cyclesWithKeyResults = cycles.filter(
    (cycle) => cycle.keyResults && cycle.keyResults.length > 0,
  )
  const hasCyclesWithKeyResults = cyclesWithKeyResults.length > 0

  return hasCyclesWithKeyResults ? (
    <>
      {cyclesWithKeyResults.map((cycle) => (
        <KeyResultCycleList key={cycle.id} id={cycle.id} onLineClick={onLineClick} />
      ))}
    </>
  ) : (
    <EmptyState labelMessage={messages.emptyStateLabel} />
  )
}

export default KeyResultNotActiveAndOwnedByUserCyclesList
