import { HStack } from '@chakra-ui/react'
import React from 'react'

import UserTeamTags from '../TeamTags'

import { AddUserTeam } from './add-team'

type UserTeamsProperties = {
  userID?: string
  isEditable?: boolean
  isLoaded?: boolean
}

export const UserTeams = ({ userID, isLoaded, isEditable }: UserTeamsProperties) => (
  <HStack>
    <UserTeamTags userID={userID} isLoaded={isLoaded} />
    {isEditable && <AddUserTeam />}
  </HStack>
)
