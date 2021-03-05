import { useLazyQuery } from '@apollo/client'
import { Divider, Flex, Stack } from '@chakra-ui/react'
import isMatch from 'lodash/isMatch'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import meAtom from 'src/state/recoil/user/me'
import userSelector from 'src/state/recoil/user/selector'

import SettingsAccountBody from './Body'
import SettingsAccountHeader from './Header'
import SettingsAccountUserCardPreview from './UserCardPreview'
import queries from './queries.gql'

export interface GetUserDataQuery {
  user: {
    id: User['id']
    firstName: User['firstName']
    fullName: User['fullName']
    lastname?: User['lastName']
    role?: User['role']
    nickname?: User['nickname']
    gender?: User['gender']
    about?: User['about']
    linkedInProfileAddress?: User['linkedInProfileAddress']
    teams?: Array<{
      id: Team['id']
      name: Team['name']
    }>
  }
}

const SettingsAccount = () => {
  const [isRecoilSynced, setIsRecoilSynced] = useState(false)
  const myUserID = useRecoilValue(meAtom)
  const [user, setUser] = useRecoilState(userSelector(myUserID))
  const [getUserData, { loading, variables, data }] = useLazyQuery<GetUserDataQuery>(
    queries.GET_USER_DATA,
    {
      onCompleted: (data) => setUser(data.user),
      variables: {
        id: myUserID,
      },
    },
  )

  const isLoaded = !loading && isRecoilSynced

  useEffect(() => {
    if (myUserID && myUserID !== variables?.id) getUserData()
  }, [myUserID, getUserData, variables])

  useEffect(() => {
    if (!isRecoilSynced && data && user && isMatch(user, data.user)) setIsRecoilSynced(true)
  }, [isRecoilSynced, setIsRecoilSynced, user, data])

  return (
    <Flex direction="row" w="full" gridGap={14}>
      <Stack py={4} spacing={6} direction="column" flexGrow={1}>
        <SettingsAccountHeader userID={myUserID} isLoaded={isLoaded} />
        <Divider borderColor="black.200" />
        <SettingsAccountBody userID={myUserID} isLoaded={isLoaded} />
      </Stack>

      <Divider orientation="vertical" borderColor="black.200" />

      <SettingsAccountUserCardPreview userID={myUserID} />
    </Flex>
  )
}

export default SettingsAccount
