import { Box, Stack } from '@chakra-ui/react'
import React from 'react'

import { TeamObjectives } from 'src/components/Team/Objectives/wrapper'
import { Team } from 'src/components/Team/types'

import { ChildTeamsWrapper } from '../../ChildTeams/wrapper'
import TeamHightlightModal from '../../Highlights/modals/base'
import { TeamHighlightsWrapper } from '../../Highlights/wrapper'
import { TeamMembersWrapper } from '../../Members/wrapper'

interface OkrsTabContentProperties {
  teamId: Team['id']
  isLoading?: boolean
}

const OkrsTabContent = ({ teamId, isLoading }: OkrsTabContentProperties) => {
  return (
    <Stack direction="row" spacing={8} maxH="100%">
      <Box flexGrow={1}>
        <TeamObjectives teamID={teamId} />
      </Box>
      <TeamHightlightModal teamId={teamId} />
      <Stack spacing="8" w="md" minW="md">
        <TeamHighlightsWrapper teamID={teamId} />
        <TeamMembersWrapper teamID={teamId} isLoading={isLoading} />
        <ChildTeamsWrapper teamID={teamId} isLoading={isLoading} />
      </Stack>
    </Stack>
  )
}

export default OkrsTabContent
