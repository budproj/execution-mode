import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { GraphQLEffect } from 'src/components/types'

import { useConnectionEdges } from '../../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../../state/recoil/hooks'
import { teamAtomFamily } from '../../../../state/recoil/team'
import { userAtomFamily } from '../../../../state/recoil/user'
import { User } from '../../../User/types'

import { TeamMembers } from './members'

interface TeamMembersWrapperProperties {
  teamID?: string
  isLoading?: boolean
}

export const TeamMembersWrapper = ({ teamID, isLoading }: TeamMembersWrapperProperties) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const team = useRecoilValue(teamAtomFamily(teamID))
  const [teamMembers, setTeamMemberEdges] = useConnectionEdges(team?.users?.edges)
  const [loadUsersOnRecoil] = useRecoilFamilyLoader<User>(userAtomFamily)

  const hasAddMembersPermission = team?.users?.policy?.create === GraphQLEffect.ALLOW

  useEffect(() => {
    if (team) {
      setTeamMemberEdges(team.users?.edges)
      if (!isLoaded && !isLoading) setIsLoaded(true)
    }
  }, [team, setTeamMemberEdges, isLoading, isLoaded, setIsLoaded])

  useEffect(() => {
    loadUsersOnRecoil(teamMembers)
  }, [teamMembers, loadUsersOnRecoil])

  useEffect(() => {
    if (isLoaded && isLoading) setIsLoaded(false)
  }, [isLoading, isLoaded, setIsLoaded])

  return (
    <TeamMembers
      teamID={teamID}
      isLoaded={isLoaded}
      members={teamMembers}
      hasAddMembersPermission={hasAddMembersPermission}
      teamLeader={team?.owner}
      usersIdsBlacklist={team?.owner ? [team?.owner.id] : []}
    />
  )
}
