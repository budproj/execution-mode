import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { useConnectionEdges } from '../../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../../state/recoil/hooks'
import { teamAtomFamily } from '../../../../state/recoil/team'
import { userAtomFamily } from '../../../../state/recoil/user'
import { UserList } from '../../../User/List/wrapper'
import { User } from '../../../User/types'
import { TeamSectionWrapper } from '../Section/wrapper'

import messages from './messages'

interface TeamMembersWrapperProperties {
  teamID?: string
}

export const TeamMembersWrapper = ({ teamID }: TeamMembersWrapperProperties) => {
  const intl = useIntl()
  const [isLoaded, setIsLoaded] = useState(false)
  const team = useRecoilValue(teamAtomFamily(teamID))
  const [teamMembers, setTeamMemberEdges] = useConnectionEdges(team?.users?.edges)
  const loadUsersOnRecoil = useRecoilFamilyLoader<User>(userAtomFamily)

  useEffect(() => {
    if (team) {
      setTeamMemberEdges(team.users?.edges)
      if (!isLoaded) setIsLoaded(true)
    }
  }, [team, setTeamMemberEdges, isLoaded, setIsLoaded])

  useEffect(() => {
    loadUsersOnRecoil(teamMembers)
  }, [teamMembers, loadUsersOnRecoil])

  return (
    <TeamSectionWrapper
      p={4}
      title={intl.formatMessage(messages.title, {
        isLoaded,
        totalMembersCount: teamMembers.length,
      })}
    >
      <UserList users={teamMembers} avatarSubtitleType="role" isLoading={!isLoaded} />
    </TeamSectionWrapper>
  )
}
