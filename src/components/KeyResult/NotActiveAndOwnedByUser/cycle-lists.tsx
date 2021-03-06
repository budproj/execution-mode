import React from 'react'

import { EmptyState } from 'src/components/Base'
import { Cycle } from 'src/components/Cycle/types'
import KeyResultCycleList from 'src/components/KeyResult/CycleList'
import { KeyResult } from 'src/components/KeyResult/types'

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
  const cyclesWithKeyResults =
    cycles?.filter((cycle) => cycle.keyResults && cycle.keyResults?.edges.length > 0) ?? []

  return cyclesWithKeyResults.length > 0 ? (
    <>
      {cyclesWithKeyResults.map((cycle) => (
        <KeyResultCycleList
          key={cycle.id}
          isDisabled
          isActive={false}
          id={cycle.id}
          onLineClick={onLineClick}
        />
      ))}
    </>
  ) : (
    <EmptyState labelMessage={messages.emptyStateLabel} />
  )
}

export default KeyResultNotActiveAndOwnedByUserCyclesList
