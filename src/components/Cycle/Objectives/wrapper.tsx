import { useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import { Heading, Skeleton, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ObjectiveMode, setObjectiveToMode } from 'src/state/recoil/objective/context'

import buildSkeletonMinSize from '../../../../lib/chakra/build-skeleton-min-size'
import useCadence from '../../../state/hooks/useCadence'
import meAtom from '../../../state/recoil/user/me'
import { ObjectiveAccordion } from '../../Objective/Accordion/wrapper'
import { Delta, GraphQLEntityPolicy, Status } from '../../types'
import { Action, ActionMenu } from '../ActionMenu/wrapper'
import { Cycle } from '../types'

import messages from './messages'
import queries from './queries.gql'

export interface ObjectivesFromCycleProperties {
  cycle?: Cycle
  objectiveIDs: string[]
  teamID?: string
  onViewOldCycles?: Action
  isDisabled?: boolean
  isAllowedToCreateObjectives?: boolean
  onNewObjective?: () => void
}

type CreateDraftObjectiveQueryResult = {
  createObjective: {
    id: string
    title: string
    cycle: Cycle
    status: Status
    delta: Delta
    policy: GraphQLEntityPolicy
  }
}

export const CycleObjectives = ({
  cycle,
  objectiveIDs,
  teamID,
  onViewOldCycles,
  isDisabled,
  isAllowedToCreateObjectives,
  onNewObjective,
}: ObjectivesFromCycleProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const ownerID = useRecoilValue(meAtom)
  const setObjectiveIDToEditMode = useSetRecoilState(setObjectiveToMode(ObjectiveMode.EDIT))
  const [cadence, setCadenceValue] = useCadence(cycle?.cadence)

  const [createDraftObjective] = useMutation<CreateDraftObjectiveQueryResult>(
    queries.CREATE_DRAFT_OBJECTIVE,
    {
      variables: {
        title: intl.formatMessage(messages.draftObjectiveTitle),
        cycleID: cycle?.id,
        ownerID,
        teamID,
      },
      onCompleted: async (data) => {
        toast({
          title: intl.formatMessage(messages.draftObjectiveSuccessToastMessage),
          status: 'success',
        })

        setObjectiveIDToEditMode(data.createObjective.id)
        if (onNewObjective) void onNewObjective()
      },
      onError: () => {
        toast({
          title: intl.formatMessage(messages.draftObjectiveErrorToastMessage),
          status: 'error',
        })
      },
    },
  )

  const isLoaded = Boolean(cycle)
  const shouldDisplayActionMenu = Boolean(onViewOldCycles) || Boolean(isAllowedToCreateObjectives)

  const handleDraftObjectiveCreation = (cycleID?: string) => {
    void createDraftObjective({
      variables: {
        cycleID,
      },
    })
  }

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
            cycleID={cycle?.id}
            onViewOldCycles={onViewOldCycles}
            onCreateOKR={isAllowedToCreateObjectives ? handleDraftObjectiveCreation : undefined}
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
