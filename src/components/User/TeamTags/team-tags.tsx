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
  userID?: User['id']
  isLoaded?: boolean
  max?: number
}

const UserTeamTags = ({ userID, isLoaded, max }: UserTeamTagsProperties) => {
  const user = useRecoilValue(userAtomFamily(userID))
  const [teams, setTeamEdges] = useConnectionEdges<Team>()
  const limitedTeams = teams?.slice(0, max)

  useEffect(() => {
    if (user) setTeamEdges(user.teams?.edges)
  }, [user, setTeamEdges])

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
