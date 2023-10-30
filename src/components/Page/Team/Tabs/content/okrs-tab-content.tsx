import { useQuery } from '@apollo/client'
import { Flex, Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { TeamObjectives } from 'src/components/Team/Objectives/wrapper'
import { Team } from 'src/components/Team/types'
import { GraphQLEffect } from 'src/components/types'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'
import {
  ObjectivesViewMode,
  teamObjectivesViewMode,
} from 'src/state/recoil/team/objectives-view-mode'

import { ChildTeamsWrapper } from '../../ChildTeams/wrapper'
import { MenuHeader } from '../../Header/menu'
import TeamHightlightModal from '../../Highlights/modals/base'
import { TeamIndicatorsReportDownloadCSV } from '../../Indicators'
import { TeamMembersWrapper } from '../../Members/wrapper'

import { TeamFlagsProperties } from './permissions'
import queries from './queries.gql'

const DynamicTeamHighlighsWrapper = dynamic(async () => import('../../Highlights/wrapper'))
const DynamicTeamIndicatorsWrapper = dynamic(async () => import('../../Indicators/wrapper'))

interface OkrsTabContentProperties {
  teamId: Team['id']
  isLoading?: boolean
}

const StyledDiv = styled('div')`
  width: 100%;
  position: absolute !important;
  bottom: 0;
  left: 0;
  background: black;

  > div {
    position: absolute !important;
  }

  .image {
    width: 100% !important;
    height: unset !important;
    background: #f8f9fd;
  }
`

const OkrsTabContent = ({ teamId, isLoading }: OkrsTabContentProperties) => {
  const [permissions, setPermissions] = useState<TeamFlagsProperties['permissions']>()
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdHighlight)
  const getObjectivesViewMode = useRecoilValue(teamObjectivesViewMode(teamId))
  const isViewingActiveObjectives = getObjectivesViewMode === ObjectivesViewMode.ACTIVE

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
      <StyledDiv>
        <Image fill src="/images/shape-footer-team.svg" className="image" alt="mudar" />
      </StyledDiv>
      <Stack flexGrow={1} spacing={8}>
        {permissions?.flags?.read === GraphQLEffect.ALLOW && (
          <DynamicTeamIndicatorsWrapper teamID={teamId} />
        )}
        <TeamObjectives teamID={teamId} />
      </Stack>
      <TeamHightlightModal />
      <Stack spacing={8} w="md" minW="md">
        <Flex flexDir="column" mt="0 !important">
          <MenuHeader teamId={teamId} />
          {permissions?.flags?.read === GraphQLEffect.ALLOW && isViewingActiveObjectives && (
            <TeamIndicatorsReportDownloadCSV teamID={teamId} />
          )}
        </Flex>
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
