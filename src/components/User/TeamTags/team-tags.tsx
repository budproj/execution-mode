import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import TeamTag from 'src/components/Team/Tag'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

import UserTeamTagsSkeleton from './skeleton'

export interface UserTeamTagsProperties {
  userID?: User['id']
  isLoaded?: boolean
}

const UserTeamTags = ({ userID, isLoaded }: UserTeamTagsProperties) => {
  const user = useRecoilValue(userAtomFamily(userID))

  return isLoaded ? (
    <Stack spacing={2} direction="row">
      {user?.teams?.map((team) => (
        <TeamTag key={team.id}>{team.name}</TeamTag>
      ))}
    </Stack>
  ) : (
    <UserTeamTagsSkeleton />
  )
}

export default UserTeamTags
