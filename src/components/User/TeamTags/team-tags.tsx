import { Wrap, WrapItem } from '@chakra-ui/react'
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
    <Wrap spacing={2}>
      {user?.teams?.map((team) => (
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
