import { Flex, Stack, Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { imageKeys } from 'src/components/Base/EmptyState/empty-state'
import { Cycle } from 'src/components/Cycle/types'
import { Delta, GraphQLEntityPolicy, Status } from 'src/components/types'

import { EmptyState } from '../../Base'

import messages from './messages'

type OKRsEmptyStateProperties = {
  imageKey?: keyof typeof imageKeys
  isPersonalObjective?: boolean
}

export type CreateDraftObjectiveQueryResult = {
  createObjective: {
    id: string
    title: string
    cycle: Cycle
    status: Status
    delta: Delta
    policy: GraphQLEntityPolicy
  }
}

export const OKRsEmptyState = ({ isPersonalObjective, imageKey }: OKRsEmptyStateProperties) => {
  const intl = useIntl()

  return (
    <Stack spacing={4} h="full">
      <Stack direction="row" alignItems="center">
        <Heading fontSize={14} color="gray.500" flexGrow={1}>
          {isPersonalObjective
            ? intl.formatMessage(messages.personalObjectivesEmptyStateTitle)
            : intl.formatMessage(messages.teamObjectivesEmptyStateTitle)}
        </Heading>
      </Stack>

      <Flex
        bg="white"
        w="full"
        h="full"
        alignContent="center"
        justifyContent="center"
        p={16}
        borderRadius={10}
        boxShadow="with-stroke.dark"
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
