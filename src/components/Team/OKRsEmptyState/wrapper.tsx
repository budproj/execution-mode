import { useMutation } from '@apollo/client'
import { Flex, Stack } from '@chakra-ui/react'
import { Heading, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Action, ActionMenu } from 'src/components/Cycle/ActionMenu/wrapper'
import { Cycle } from 'src/components/Cycle/types'
import { Delta, GraphQLEntityPolicy, Status } from 'src/components/types'
import { ObjectiveMode, setObjectiveToMode } from 'src/state/recoil/objective/context'
import meAtom from 'src/state/recoil/user/me'

import { EmptyState } from '../../Base'

import messages from './messages'
import queries from './queries.gql'

type TeamOKRsEmptyStateProperties = {
  teamID: string
  isAllowedToCreateObjectives?: boolean
  onViewOldCycles?: Action
  onNewObjective?: Action
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

export const TeamOKRsEmptyState = ({
  teamID,
  onViewOldCycles,
  onNewObjective,
  isAllowedToCreateObjectives,
}: TeamOKRsEmptyStateProperties) => {
  const intl = useIntl()
  const toast = useToast()
  const ownerID = useRecoilValue(meAtom)
  const setObjectiveIDToEditMode = useSetRecoilState(setObjectiveToMode(ObjectiveMode.EDIT))

  const [createDraftObjective] = useMutation<CreateDraftObjectiveQueryResult>(
    queries.CREATE_DRAFT_OBJECTIVE,
    {
      variables: {
        title: intl.formatMessage(messages.draftObjectiveTitle),
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

  const handleDraftObjectiveCreation = (cycleID?: string) => {
    void createDraftObjective({
      variables: {
        cycleID,
      },
    })
  }

  const shouldDisplayActionMenu = Boolean(onViewOldCycles) || Boolean(isAllowedToCreateObjectives)

  return (
    <Stack spacing={4} h="full">
      <Stack direction="row" alignItems="center">
        <Heading fontSize="sm" color="gray.500" textTransform="uppercase" flexGrow={1}>
          {intl.formatMessage(messages.emptyStateTitle)}
        </Heading>

        {shouldDisplayActionMenu && (
          <ActionMenu
            onViewOldCycles={onViewOldCycles}
            onCreateOKR={isAllowedToCreateObjectives ? handleDraftObjectiveCreation : undefined}
          />
        )}
      </Stack>

      <Flex bg="white" w="full" h="full" alignContent="center" justifyContent="center" p={16}>
        <EmptyState
          imageKey="people-with-pages"
          labelMessage={messages.emptyStateMessage}
          maxW="md"
        />
      </Flex>
    </Stack>
  )
}
