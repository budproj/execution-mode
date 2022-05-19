import { useMutation } from '@apollo/client'
import { Flex, Stack, Heading, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { imageKeys } from 'src/components/Base/EmptyState/empty-state'
import { Action, ActionMenu } from 'src/components/Cycle/ActionMenu/wrapper'
import { Cycle } from 'src/components/Cycle/types'
import { Team } from 'src/components/Team/types'
import { Delta, GraphQLEntityPolicy, Status } from 'src/components/types'
import { ObjectiveMode, setObjectiveToMode } from 'src/state/recoil/objective/context'
import meAtom from 'src/state/recoil/user/me'

import { EmptyState } from '../../Base'

import messages from './messages'
import queries from './queries.gql'

type OKRsEmptyStateProperties = {
  teamID: Team['id'] | null
  imageKey?: keyof typeof imageKeys
  isAllowedToCreateObjectives?: boolean
  isPersonalObjective?: boolean
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

export const OKRsEmptyState = ({
  teamID,
  isPersonalObjective,
  onViewOldCycles,
  onNewObjective,
  imageKey,
  isAllowedToCreateObjectives,
}: OKRsEmptyStateProperties) => {
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
        <Heading fontSize={16} color="gray.500" flexGrow={1}>
          {isPersonalObjective
            ? intl.formatMessage(messages.personalObjectivesEmptyStateTitle)
            : intl.formatMessage(messages.teamObjectivesEmptyStateTitle)}
        </Heading>

        {shouldDisplayActionMenu && (
          <ActionMenu
            onViewOldCycles={onViewOldCycles}
            onCreateOKR={isAllowedToCreateObjectives ? handleDraftObjectiveCreation : undefined}
          />
        )}
      </Stack>

      <Flex
        bg="white"
        w="full"
        h="full"
        alignContent="center"
        justifyContent="center"
        p={16}
        borderRadius={10}
      >
        <EmptyState
          imageKey={imageKey}
          labelMessage={
            isPersonalObjective
              ? messages.personalObjectivesEmptyStateMessage
              : messages.teamObjectivesEmptyStateMessage
          }
          maxW="md"
        />
      </Flex>
    </Stack>
  )
}
