import { useLazyQuery } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import { Box, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { GraphQLConnectionPolicy, GraphQLEffect } from 'src/components/types'

import { GetTeamMembersResponse } from '../Team/Members/members'

import messages from './messages'
import queries from './queries.gql'

interface UpperMenuProperties {
  openModal: () => void
  setTeamFilter: (text: string) => void
  teamId?: string
}

const UpperMenu = ({ openModal, setTeamFilter, teamId }: UpperMenuProperties) => {
  const intl = useIntl()
  const [policy, setPolicy] = useState<GraphQLConnectionPolicy>()

  const [refreshTeamPolicy] = useLazyQuery<GetTeamMembersResponse>(
    queries.GET_TEAM_MEMBERS_POLICY,
    {
      fetchPolicy: 'network-only',
      variables: {
        teamID: teamId,
      },
      onCompleted: (data) => {
        setPolicy(data.team?.users?.policy)
      },
    },
  )

  useEffect(() => {
    if (teamId) refreshTeamPolicy()
  }, [teamId, refreshTeamPolicy])

  const hasCreateTeamPermission = policy?.create === GraphQLEffect.ALLOW

  return (
    <Stack direction="row" justifyContent="flex-end" marginTop="0.8em">
      <Box w="15rem">
        <SearchBar
          placeholder={intl.formatMessage(messages.searchPlaceholder)}
          onSearch={setTeamFilter}
        />
      </Box>
      {hasCreateTeamPermission && (
        <Button
          bg="brand.500"
          color="black.50"
          _hover={{ background: 'brand.400', color: 'black.50' }}
          onClick={openModal}
        >
          {intl.formatMessage(messages.createTeamButton)}
        </Button>
      )}
    </Stack>
  )
}

export default UpperMenu
