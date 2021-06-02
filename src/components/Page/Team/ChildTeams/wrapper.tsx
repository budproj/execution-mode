import { Box } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilValue } from 'recoil'

import { useConnectionEdges } from '../../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../../state/recoil/hooks'
import { teamAtomFamily } from '../../../../state/recoil/team'
import { EmptyState } from '../../../Base'
import { TeamList } from '../../../Team/List/wrapper'
import { Team } from '../../../Team/types'
import { TeamSectionWrapper } from '../Section/wrapper'

import messages from './messages'

interface ChildTeamsWrapperProperties {
  teamID?: string
  isLoading?: boolean
}

export const ChildTeamsWrapper = ({ teamID, isLoading }: ChildTeamsWrapperProperties) => {
  const intl = useIntl()
  const [isLoaded, setIsLoaded] = useState(false)
  const team = useRecoilValue(teamAtomFamily(teamID))
  const [childTeams, setChildTeamEdges, childTeamEdges, areEdgesLoaded] = useConnectionEdges<Team>()
  const loadTeamsOnRecoil = useRecoilFamilyLoader<Team>(teamAtomFamily)

  useEffect(() => {
    if (team) setChildTeamEdges(team.teams?.edges)
  }, [team, setChildTeamEdges])

  useEffect(() => {
    loadTeamsOnRecoil(childTeams)
  }, [childTeams, loadTeamsOnRecoil])

  useEffect(() => {
    if (!isLoaded && !isLoading && childTeamEdges && areEdgesLoaded) setIsLoaded(true)
  }, [isLoaded, isLoading, childTeamEdges, areEdgesLoaded, setIsLoaded])

  useEffect(() => {
    if (!childTeamEdges) setIsLoaded(false)
  }, [childTeamEdges, setIsLoaded])

  return (
    <TeamSectionWrapper
      title={intl.formatMessage(messages.title, {
        isLoaded,
        totalTeamsCount: childTeams.length,
      })}
    >
      {isLoaded && childTeams.length === 0 ? (
        <EmptyState imageKey="empty-folder" labelMessage={messages.emptyState} py={8} />
      ) : (
        <PerfectScrollbar>
          <Box px={8}>
            <TeamList teams={childTeams} isLoading={!isLoaded} />
          </Box>
        </PerfectScrollbar>
      )}
    </TeamSectionWrapper>
  )
}
