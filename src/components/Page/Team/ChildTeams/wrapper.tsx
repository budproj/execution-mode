import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { useConnectionEdges } from '../../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../../state/recoil/hooks'
import { teamAtomFamily } from '../../../../state/recoil/team'
import { TeamList } from '../../../Team/List/wrapper'
import { Team } from '../../../Team/types'
import { TeamSectionWrapper } from '../Section/wrapper'

import messages from './messages'

interface ChildTeamsWrapperProperties {
  teamID?: string
}

export const ChildTeamsWrapper = ({ teamID }: ChildTeamsWrapperProperties) => {
  const intl = useIntl()
  const [isLoaded, setIsLoaded] = useState(false)
  const team = useRecoilValue(teamAtomFamily(teamID))
  const [childTeams, setChildTeamEdges] = useConnectionEdges<Team>()
  const loadTeamsOnRecoil = useRecoilFamilyLoader<Team>(teamAtomFamily)

  useEffect(() => {
    if (team) {
      setChildTeamEdges(team.teams?.edges)
      if (!isLoaded) setIsLoaded(true)
    }
  }, [team, setChildTeamEdges, isLoaded, setIsLoaded])

  useEffect(() => {
    loadTeamsOnRecoil(childTeams)
  }, [childTeams, loadTeamsOnRecoil])

  return (
    <TeamSectionWrapper
      px={8}
      title={intl.formatMessage(messages.title, {
        isLoaded,
        totalTeamsCount: childTeams.length,
      })}
    >
      <TeamList teams={childTeams} isLoaded={isLoaded} />
    </TeamSectionWrapper>
  )
}
