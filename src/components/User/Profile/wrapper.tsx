import { useLazyQuery } from '@apollo/client'
import { Divider, Stack } from '@chakra-ui/react'
import { isMatch } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { GraphQLEffect } from 'src/components/types'
import { userSelector } from 'src/state/recoil/user'

import { User } from '../types'

import { UserProfileBody } from './Body/wrapper'
import { UserProfileHeader } from './Header/wrapper'
import queries from './queries.gql'

type UserProfileProperties = {
  userID: string
  isRemovable?: boolean
  onUserDeactivation?: () => void
}

export interface GetUserDataQuery {
  user: User
}

export const UserProfile = ({ userID, isRemovable, onUserDeactivation }: UserProfileProperties) => {
  isRemovable ??= true

  const [isRecoilSynced, setIsRecoilSynced] = useState(false)
  const [user, setUser] = useRecoilState(userSelector(userID))
  const [getUserData, { loading, variables, data }] = useLazyQuery<GetUserDataQuery>(
    queries.GET_USER_DATA,
    {
      onCompleted: (data) => setUser(data.user),
      variables: {
        id: userID,
      },
    },
  )

  const isLoaded = !loading && isRecoilSynced
  const canUpdate = user?.policy?.update === GraphQLEffect.ALLOW
  const canDelete = isRemovable && user?.policy?.delete === GraphQLEffect.ALLOW

  useEffect(() => {
    if (userID && userID !== variables?.id) getUserData()
  }, [userID, getUserData, variables])

  useEffect(() => {
    if (!isRecoilSynced && data && user && isMatch(user, data.user)) setIsRecoilSynced(true)
  }, [isRecoilSynced, setIsRecoilSynced, user, data])

  return (
    <Stack py={4} spacing={6} direction="column" flexGrow={1} h="full">
      <UserProfileHeader userID={userID} isLoaded={isLoaded} canUpdate={canUpdate} />
      <Divider borderColor="black.200" />
      <UserProfileBody
        userID={userID}
        isLoaded={isLoaded}
        canUpdate={canUpdate}
        canDelete={canDelete}
        onUserDeactivation={onUserDeactivation}
      />
    </Stack>
  )
}
