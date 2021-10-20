import { map, mapValues } from 'lodash'
import groupBy from 'lodash/groupBy'
import React from 'react'

import { EmptyState } from 'src/components/Base'
import { KeyResult } from 'src/components/KeyResult/types'

import { CycleKeyResultList } from '../CycleList/cycle-key-result-list'

import messages from './messages'

export interface KeyResultActiveAndOwnedByUserCyclesListProperties {
  keyResults?: KeyResult[]
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultActiveAndOwnedByUserCyclesList = ({
  keyResults,
  onLineClick,
}: KeyResultActiveAndOwnedByUserCyclesListProperties) => {
  const keyResultsGroupedByCycle = groupBy(keyResults, 'objective.cycle.id')
  const cycles = mapValues(keyResultsGroupedByCycle, (keyResults) => ({
    data: keyResults[0].objective.cycle,
    keyResultIDs: keyResults.map((keyResult) => keyResult.id),
  }))

  return keyResults && keyResults.length > 0 ? (
    <>
      {map(cycles, (cycle) => (
        <CycleKeyResultList
          isLoaded
          isActive
          cycle={cycle.data}
          keyResultIDs={cycle.keyResultIDs}
          onLineClick={onLineClick}
        />
      ))}
    </>
  ) : (
    <EmptyState labelMessage={messages.emptyStateLabel} />
  )
}

export default KeyResultActiveAndOwnedByUserCyclesList
