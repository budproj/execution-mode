import { useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import { Heading, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from '../../../../lib/chakra/build-skeleton-min-size'
import useCadence from '../../../state/hooks/useCadence'
import meAtom from '../../../state/recoil/user/me'
import { Cycle } from '../../Cycle/types'
import { ObjectiveAccordion } from '../AccordionItem/wrapper'

import { Action, ActionMenu } from './action-menu'
import messages from './messages'
import queries from './queries.gql'

export interface ObjectivesFromCycleProperties {
  cycle?: Cycle
  objectiveIDs: string[]
  teamID?: string
  onViewOldCycles?: Action
  isDisabled?: boolean
  canCreateObjective?: boolean
}

export const ObjectivesFromCycle = ({
  cycle,
  objectiveIDs,
  teamID,
  onViewOldCycles,
  isDisabled,
  canCreateObjective,
}: ObjectivesFromCycleProperties) => {
  const intl = useIntl()
  const userID = useRecoilValue(meAtom)
  const [cadence, setCadenceValue] = useCadence(cycle?.cadence)
  const [createDraftObjective] = useMutation(queries.CREATE_DRAFT_OBJECTIVE, {
    variables: {
      title: intl.formatMessage(messages.draftObjectiveTitle),
      cycleID: cycle?.id,
      ownerID: userID,
      teamID,
    },
  })

  const isLoaded = Boolean(cycle)
  const shouldDisplayActionMenu = Boolean(onViewOldCycles)

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

        {shouldDisplayActionMenu && (
          <ActionMenu
            onViewOldCycles={onViewOldCycles}
            onCreateOKR={canCreateObjective ? createDraftObjective : undefined}
          />
        )}
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
