import React from 'react'

import { EmptyState } from 'src/components/Base'
import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultCycleList from '../CycleList'

import messages from './messages'

export interface KeyResultActiveAndOwnedByUserCyclesListProperties {
  cycles?: Cycle[]
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultActiveAndOwnedByUserCyclesList = ({
  cycles,
  onLineClick,
}: KeyResultActiveAndOwnedByUserCyclesListProperties) => {
  const cyclesWithKeyResults =
    cycles?.filter((cycle) => cycle.keyResults && cycle.keyResults?.edges.length > 0) ?? []

  return cyclesWithKeyResults.length > 0 ? (
    <>
      {cyclesWithKeyResults.map((cycle) => (
        <KeyResultCycleList key={cycle.id} id={cycle.id} onLineClick={onLineClick} />
      ))}
    </>
  ) : (
    <EmptyState labelMessage={messages.emptyStateLabel} />
  )
}

export default KeyResultActiveAndOwnedByUserCyclesList
