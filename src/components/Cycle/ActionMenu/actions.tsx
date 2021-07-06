import { MenuItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import useCadence from 'src/state/hooks/useCadence'

import { Cycle } from '../types'

import messages from './messages'

type OptionsProperties = {
  onViewOldCycles?: () => void
  onCreateOKR?: (cycleID?: string) => void
  currentCycleID?: string
  relatedCycles?: Cycle[]
}

type AddOKROnRelatedCycleOptionProperties = {
  cycle: Cycle
  onCreateOKR: (cycleID?: string) => void
}

export const Actions = ({
  onViewOldCycles,
  onCreateOKR,
  currentCycleID,
  relatedCycles,
}: OptionsProperties) => {
  const intl = useIntl()

  return (
    <>
      {onViewOldCycles && (
        <MenuItem onClick={onViewOldCycles}>
          {intl.formatMessage(messages.explorePreviousCyclesOption)}
        </MenuItem>
      )}
      {onCreateOKR && Boolean(currentCycleID) && (
        <MenuItem onClick={() => onCreateOKR(currentCycleID)}>
          {intl.formatMessage(messages.createOKRInThisCycleOption)}
        </MenuItem>
      )}
      {onCreateOKR &&
        relatedCycles &&
        relatedCycles.length > 0 &&
        relatedCycles.map((cycle) => (
          <AddOKROnRelatedCycleOption key={cycle.id} cycle={cycle} onCreateOKR={onCreateOKR} />
        ))}
    </>
  )
}

const AddOKROnRelatedCycleOption = ({
  cycle,
  onCreateOKR,
}: AddOKROnRelatedCycleOptionProperties) => {
  const intl = useIntl()
  const [cadence] = useCadence(cycle.cadence)

  return (
    <MenuItem onClick={() => onCreateOKR(cycle.id)}>
      {intl
        .formatMessage(messages.createOKRInRelatedCycleOption, {
          cadence: cadence.prefix?.toLowerCase(),
          cycle: cycle.period,
          parent: cycle.parent?.period,
        })
        .trim()}
    </MenuItem>
  )
}
