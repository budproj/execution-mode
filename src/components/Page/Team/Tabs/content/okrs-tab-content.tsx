import { useQuery } from '@apollo/client'
import { Box, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { TeamObjectives } from 'src/components/Team/Objectives/wrapper'
import { Team } from 'src/components/Team/types'
import { GraphQLEffect } from 'src/components/types'

import { ChildTeamsWrapper } from '../../ChildTeams/wrapper'
import TeamHightlightModal from '../../Highlights/modals/base'
import { TeamHighlightsWrapper } from '../../Highlights/wrapper'
import { TeamMembersWrapper } from '../../Members/wrapper'

import { TeamFlagsProperties } from './permissions'
import queries from './queries.gql'

interface OkrsTabContentProperties {
  teamId: Team['id']
  isLoading?: boolean
}

const OkrsTabContent = ({ teamId, isLoading }: OkrsTabContentProperties) => {
  const [permissions, setPermissions] = useState<TeamFlagsProperties['permissions']>()

  useQuery(queries.GET_USER_SETTINGS_PERMISSIONS, {
    onCompleted: (data) => {
      setPermissions(data.permissions)
    },
  })

  return (
    <Stack direction="row" spacing={8} maxH="100%">
      <Box flexGrow={1}>
        <TeamObjectives teamID={teamId} />
      </Box>
      <TeamHightlightModal />
      <Stack spacing="8" w="md" minW="md">
        {permissions?.flags?.read === GraphQLEffect.ALLOW && (
          <TeamHighlightsWrapper teamID={teamId} isLoading={isLoading} />
        )}
        <TeamMembersWrapper teamID={teamId} isLoading={isLoading} />
        <ChildTeamsWrapper teamID={teamId} isLoading={isLoading} />
      </Stack>
    </Stack>
  )
}

export default OkrsTabContent
