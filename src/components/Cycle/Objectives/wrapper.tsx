import { Stack } from '@chakra-ui/react'
import { Heading, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from '../../../../lib/chakra/build-skeleton-min-size'
import useCadence from '../../../state/hooks/useCadence'
import { ObjectiveAccordion } from '../../Objective/Accordion/wrapper'
import { Cycle } from '../types'

import messages from './messages'

export interface ObjectivesFromCycleProperties {
  cycle?: Cycle
  objectiveIDs: string[]
  teamID?: string
  isDisabled?: boolean
}

export const CycleObjectives = ({
  cycle,
  objectiveIDs,
  teamID,
  isDisabled,
}: ObjectivesFromCycleProperties) => {
  const intl = useIntl()
  const [cadence, setCadenceValue] = useCadence(cycle?.cadence)

  const isLoaded = Boolean(cycle)

  useEffect(() => {
    if (cycle) setCadenceValue(cycle.cadence)
  }, [cycle, setCadenceValue])

  return (
    <Stack spacing={4}>
      <Stack direction="row" alignItems="center">
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 21)}>
          <Heading as="h2" fontSize="sm" color="gray.500" textTransform="uppercase">
            {intl
              .formatMessage(messages.title, {
                prefix: cadence.prefix,
                cycle: cycle?.period,
                suffix: cycle?.parent?.period,
              })
              .trim()}
          </Heading>
        </Skeleton>
      </Stack>

      <ObjectiveAccordion
        isLoaded={isLoaded}
        objectiveIDs={objectiveIDs}
        teamID={teamID}
        accordionID={cycle?.id}
        isDisabled={isDisabled}
      />
    </Stack>
  )
}
