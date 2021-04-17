import { useQuery } from '@apollo/client'
import React from 'react'
import { useRecoilState } from 'recoil'

import NamedAvatar from 'src/components/User/NamedAvatar'
import { User } from 'src/components/User/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import queries from './queries.gql'

export interface GetUserNamedAvatarDataQuery {
  me: User
}

const Me = () => {
  const [me, setMe] = useRecoilState(meAtom)
  const loadUser = useRecoilFamilyLoader(userAtomFamily)
  const { loading } = useQuery<GetUserNamedAvatarDataQuery>(queries.GET_USER_NAMED_AVATAR_DATA, {
    onCompleted: (data) => {
      setMe(data.me.id)
      loadUser(data.me)
    },
  })

  return <NamedAvatar userID={me} isLoading={loading} />
}

export default Me
