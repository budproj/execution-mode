import { HStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { userAtomFamily } from 'src/state/recoil/user'

import UserTeamTags from '../TeamTags'

import { AddUserTeam } from './add-team'

type UserTeamsProperties = {
  userID?: string
  isEditable?: boolean
  isLoaded?: boolean
}

export const UserTeams = ({ userID, isLoaded, isEditable }: UserTeamsProperties) => {
  const user = useRecoilValue(userAtomFamily(userID))
  const [teams, setTeamEdges] = useConnectionEdges<Team>()

  const teamIDs = teams.map((team) => team.id)

  useEffect(() => {
    if (user) setTeamEdges(user.teams?.edges)
  }, [user, setTeamEdges])

  return (
    <HStack>
      <UserTeamTags isEditable={isEditable} userID={userID} isLoaded={isLoaded} teams={teams} />
      {isEditable && <AddUserTeam teamIDsBlacklist={teamIDs} userID={userID} />}
    </HStack>
  )
}
