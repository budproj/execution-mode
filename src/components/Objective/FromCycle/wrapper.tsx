import { Stack } from '@chakra-ui/layout'
import { Heading, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from '../../../../lib/chakra/build-skeleton-min-size'
import useCadence from '../../../state/hooks/useCadence'
import { Cycle } from '../../Cycle/types'
import messages from '../../KeyResult/CycleList/messages'
import { ObjectiveAccordion } from '../AccordionItem/wrapper'

export interface ObjectivesFromCycleProperties {
  cycle?: Cycle
  objectiveIDs: string[]
  teamID?: string
}

export const ObjectivesFromCycle = ({
  cycle,
  objectiveIDs,
  teamID,
}: ObjectivesFromCycleProperties) => {
  const intl = useIntl()
  const [cadence, setCadenceValue] = useCadence(cycle?.cadence)

  const isLoaded = Boolean(cycle)

  useEffect(() => {
    if (cycle) setCadenceValue(cycle.cadence)
  }, [cycle, setCadenceValue])

  return (
    <Stack spacing={4}>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 21)}>
        <Heading fontSize="sm" color="gray.500" textTransform="uppercase">
          {intl
            .formatMessage(messages.title, {
              prefix: cadence.prefix,
              cycle: cycle?.period,
              suffix: cycle?.parent?.period,
            })
            .trim()}
        </Heading>
      </Skeleton>

      <ObjectiveAccordion
        isLoaded={isLoaded}
        objectiveIDs={objectiveIDs}
        teamID={teamID}
        accordionID={cycle?.id}
      />
    </Stack>
  )
}
