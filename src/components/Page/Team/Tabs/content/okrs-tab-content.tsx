import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { TeamObjectives } from 'src/components/Team/Objectives/wrapper'
import { Team } from 'src/components/Team/types'
import { GraphQLEffect } from 'src/components/types'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

import { ChildTeamsWrapper } from '../../ChildTeams/wrapper'
import TeamHightlightModal from '../../Highlights/modals/base'
import { TeamMembersWrapper } from '../../Members/wrapper'

import { TeamFlagsProperties } from './permissions'
import queries from './queries.gql'

const DynamicTeamHighlighsWrapper = dynamic(async () => import('../../Highlights/wrapper'))
const DynamicTeamIndicatorsWrapper = dynamic(async () => import('../../Indicators/wrapper'))

interface OkrsTabContentProperties {
  teamId: Team['id']
  isLoading?: boolean
}

const OkrsTabContent = ({ teamId, isLoading }: OkrsTabContentProperties) => {
  const [permissions, setPermissions] = useState<TeamFlagsProperties['permissions']>()
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdHighlight)

  useQuery(queries.GET_USER_SETTINGS_PERMISSIONS, {
    onCompleted: (data) => {
      setPermissions(data.permissions)
    },
  })

  useEffect(() => {
    setSelectedTeamId(teamId)
  }, [setSelectedTeamId, teamId])

  return (
    <Stack direction="row" spacing={8} maxH="100%">
      <Stack flexGrow={1} spacing={8}>
        {permissions?.flags?.read === GraphQLEffect.ALLOW && (
          <DynamicTeamIndicatorsWrapper teamID={teamId} />
        )}
        <TeamObjectives teamID={teamId} />
      </Stack>
      <TeamHightlightModal />
      <Stack spacing={8} w="md" minW="md">
        {permissions?.flags?.read === GraphQLEffect.ALLOW && (
          <DynamicTeamHighlighsWrapper teamID={teamId} isLoading={isLoading} />
        )}

        <TeamMembersWrapper teamID={teamId} isLoading={isLoading} />
        <ChildTeamsWrapper teamID={teamId} isLoading={isLoading} />
      </Stack>
    </Stack>
  )
}

export default OkrsTabContent
