import { Stack, Heading, Skeleton } from '@chakra-ui/react'
import React, { memo, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { ObjectiveAccordion } from 'src/components/Objective/Accordion/wrapper'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import buildSkeletonMinSize from '../../../../lib/chakra/build-skeleton-min-size'
import useCadence from '../../../state/hooks/useCadence'
import { Cycle } from '../types'

import messages from './messages'

export interface ObjectivesFromCycleProperties {
  cycle?: Cycle
  objectiveIDs: string[]
  teamID?: Team['id']
  userID?: User['id']
  isDisabled?: boolean
}

const CycleObjectives = ({
  cycle,
  objectiveIDs,
  teamID,
  userID,
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
          <Heading
            as="h2"
            fontWeight={700}
            fontSize={16}
            color="gray.500"
            textTransform="uppercase"
          >
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
        userID={userID}
        accordionID={cycle?.id}
        isDisabled={isDisabled}
      />
    </Stack>
  )
}

export default memo(CycleObjectives)
