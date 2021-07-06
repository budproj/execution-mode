import { ApolloQueryResult, useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import { Heading, Skeleton, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import buildSkeletonMinSize from '../../../../lib/chakra/build-skeleton-min-size'
import useCadence from '../../../state/hooks/useCadence'
import { objectiveAccordionIDsBeingEdited } from '../../../state/recoil/objective/accordion'
import meAtom from '../../../state/recoil/user/me'
import { ObjectiveAccordion } from '../../Objective/Accordion/wrapper'
import { GetTeamActiveObjectivesQuery } from '../../Team/ActiveObjectives/wrapper'
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
  canCreateObjective?: boolean
  onNewObjective?: (
    variables: Record<string, any>,
  ) => Promise<ApolloQueryResult<GetTeamActiveObjectivesQuery>>
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
  canCreateObjective,
  onNewObjective,
}: ObjectivesFromCycleProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const userID = useRecoilValue(meAtom)
  const setObjectiveIDToEditMode = useSetRecoilState(objectiveAccordionIDsBeingEdited(cycle?.id))
  const [cadence, setCadenceValue] = useCadence(cycle?.cadence)

  const [createDraftObjective] = useMutation<CreateDraftObjectiveQueryResult>(
    queries.CREATE_DRAFT_OBJECTIVE,
    {
      variables: {
        title: intl.formatMessage(messages.draftObjectiveTitle),
        cycleID: cycle?.id,
        ownerID: userID,
        teamID,
      },
      onCompleted: async (data) => {
        toast({
          title: intl.formatMessage(messages.draftObjectiveSuccessToastMessage),
          status: 'success',
        })

        setObjectiveIDToEditMode(data.createObjective.id)
        if (onNewObjective) await onNewObjective({ teamID })
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
            cycleID={cycle?.id}
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
