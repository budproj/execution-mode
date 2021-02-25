import { useLazyQuery } from '@apollo/client'
import { Divider, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import SettingsAccountBody from './Body'
import SettingsAccountHeader from './Header'
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
  const myUserID = useRecoilValue(meAtom)
  const setUser = useSetRecoilState(userAtomFamily(myUserID))
  const [getUserData, { loading, variables }] = useLazyQuery<GetUserDataQuery>(
    queries.GET_USER_DATA,
    {
      onCompleted: (data) => setUser(data.user),
      variables: {
        id: myUserID,
      },
    },
  )

  useEffect(() => {
    if (myUserID && myUserID !== variables?.id) getUserData()
  }, [myUserID, getUserData, variables])

  return (
    <Flex py={4} gridGap={6} direction="column" w="full">
      <SettingsAccountHeader userID={myUserID} loading={loading} />
      <Divider borderColor="black.200" />
      <SettingsAccountBody userID={myUserID} loading={loading} />
    </Flex>
  )
}

export default SettingsAccount
