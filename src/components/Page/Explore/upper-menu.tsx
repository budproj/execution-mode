import { useLazyQuery } from '@apollo/client'
import { Button, Box, Stack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { GraphQLConnectionPolicy, GraphQLEffect } from 'src/components/types'
import { isEditTeamModalOpenAtom } from 'src/state/recoil/team'

import { GetTeamMembersResponse } from '../Team/Members/members'

import messages from './messages'
import queries from './queries.gql'

interface UpperMenuProperties {
  setTeamFilter: (text: string) => void
  teamId?: string
}

const UpperMenu = ({ setTeamFilter, teamId }: UpperMenuProperties) => {
  const intl = useIntl()
  const [policy, setPolicy] = useState<GraphQLConnectionPolicy>()
  const setIsEditTeamModalOpen = useSetRecoilState(isEditTeamModalOpenAtom)

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

  const handleOpenModal = useCallback(() => {
    setIsEditTeamModalOpen({ isModalOpen: true, isEditingTeamId: undefined })
  }, [setIsEditTeamModalOpen])

  useEffect(() => {
    if (teamId) refreshTeamPolicy()
  }, [teamId, refreshTeamPolicy])

  const hasCreateTeamPermission = policy?.create === GraphQLEffect.ALLOW

  return (
    <Stack direction="row" justifyContent="flex-end" marginTop="0.8em">
      <Box w="15rem">
        <SearchBar
          inputBGColor="new-gray.300"
          placeholder={intl.formatMessage(messages.searchPlaceholder)}
          onSearch={setTeamFilter}
        />
      </Box>
      {hasCreateTeamPermission && (
        <Button
          bg="brand.500"
          color="black.50"
          _hover={{ background: 'brand.400', color: 'black.50' }}
          onClick={handleOpenModal}
        >
          {intl.formatMessage(messages.createTeamButton)}
        </Button>
      )}
    </Stack>
  )
}

export default UpperMenu
