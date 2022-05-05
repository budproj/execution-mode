import { map, mapValues } from 'lodash'
import groupBy from 'lodash/groupBy'
import React, { memo } from 'react'

import { EmptyState } from 'src/components/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

import { CycleKeyResultList } from '../CycleList/cycle-key-result-list'

import messages from './messages'

export interface KeyResultActiveAndOwnedByUserCyclesListProperties {
  keyResults?: KeyResult[]
  username?: User['firstName'] | undefined
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultActiveAndOwnedByUserCyclesList = ({
  keyResults,
  username,
  onLineClick,
}: KeyResultActiveAndOwnedByUserCyclesListProperties) => {
  const keyResultsGroupedByCycle = groupBy(keyResults, 'objective.cycle.id')
  const cycles = mapValues(keyResultsGroupedByCycle, (keyResults) => ({
    data: keyResults[0].objective.cycle,
    keyResultIDs: keyResults.map((keyResult) => keyResult.id),
  }))
  const labelMessage = username ? messages.userTasksEmptyStateMessage : messages.emptyStateLabel

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
    <EmptyState labelMessage={labelMessage} messageTranslationOptions={{ username }} />
  )
}

export default memo(KeyResultActiveAndOwnedByUserCyclesList)
