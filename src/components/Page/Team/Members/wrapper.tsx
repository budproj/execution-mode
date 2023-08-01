import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { GraphQLEffect } from 'src/components/types'

import { useConnectionEdges } from '../../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../../state/recoil/hooks'
import { teamAtomFamily } from '../../../../state/recoil/team'
import { userAtomFamily } from '../../../../state/recoil/user'
import selectUser from '../../../../state/recoil/user/selector'
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

  const owner = useRecoilValue(selectUser(team?.owner?.id))

  const hasAddMembersPermission = team?.users?.policy?.create === GraphQLEffect.ALLOW

  useEffect(() => {
    if (team) {
      setTeamMemberEdges(team.users?.edges)
      if (!isLoaded && !isLoading) setIsLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, isLoading, isLoaded])

  useEffect(() => {
    loadUsersOnRecoil(teamMembers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMembers])

  useEffect(() => {
    if (isLoaded && isLoading) setIsLoaded(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isLoaded])

  return owner ? (
    <TeamMembers
      teamID={teamID}
      isLoaded={isLoaded}
      members={teamMembers}
      hasAddMembersPermission={hasAddMembersPermission}
      teamLeader={owner as User}
      usersIdsBlacklist={team?.ownerId ? [team?.ownerId] : []}
    />
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  )
}
