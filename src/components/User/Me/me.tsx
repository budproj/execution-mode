import { useQuery } from '@apollo/client'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import isMatch from 'lodash/isMatch'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import NamedAvatar from 'src/components/User/NamedAvatar'
import { User } from 'src/components/User/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import UserLogout from '../Logout'

import queries from './queries.gql'

export interface GetUserNamedAvatarDataQuery {
  me: Partial<User>
}

const Me = () => {
  const [me, setMe] = useRecoilState(meAtom)
  const loadUser = useRecoilFamilyLoader(userAtomFamily)
  const user = useRecoilValue(userAtomFamily(me)) ?? {}
  const { data, loading } = useQuery<GetUserNamedAvatarDataQuery>(
    queries.GET_USER_NAMED_AVATAR_DATA,
  )

  const hasRemoteData = !loading && Boolean(data)
  const wasUserIDLoaded = data?.me.id === me
  const wasUserSynced = isMatch(user, data?.me ?? {})

  useEffect(() => {
    if (hasRemoteData && !wasUserIDLoaded) setMe(data?.me.id ?? '')
  }, [hasRemoteData, wasUserIDLoaded, data, setMe])

  useEffect(() => {
    if (hasRemoteData && wasUserIDLoaded && !wasUserSynced) loadUser(data?.me)
  }, [hasRemoteData, wasUserIDLoaded, wasUserSynced, data, loadUser])

  return (
    <Menu>
      <MenuButton>
        <NamedAvatar
          name={user?.firstName}
          picture={user?.picture}
          company={user?.companies?.[0]?.name}
          isLoading={loading}
        />
      </MenuButton>
      <MenuList>
        <MenuItem py="3px">
          <UserLogout />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default Me
