import { Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import TeamTag from 'src/components/Team/Tag'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { userAtomFamily } from 'src/state/recoil/user'

import UserTeamTagsSkeleton from './skeleton'

export interface UserTeamTagsProperties {
  teams?: Team[]
  userID?: User['id']
  isLoaded?: boolean
  max?: number
}

const UserTeamTags = ({ teams, userID, isLoaded, max }: UserTeamTagsProperties) => {
  const user = useRecoilValue(userAtomFamily(userID))
  const [remoteTeams, setTeamEdges] = useConnectionEdges<Team>()

  const userTeams = teams ?? remoteTeams
  const limitedTeams = userTeams?.slice(0, max)

  useEffect(() => {
    if (user && !teams) setTeamEdges(user.teams?.edges)
  }, [user, teams, setTeamEdges])

  return isLoaded && limitedTeams ? (
    <Wrap spacing={2}>
      {limitedTeams.map((team) => (
        <WrapItem key={team.id}>
          <TeamTag>{team.name}</TeamTag>
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <UserTeamTagsSkeleton />
  )
}

export default UserTeamTags
