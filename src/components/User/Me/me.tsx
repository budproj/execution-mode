import { useQuery } from '@apollo/client'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import NamedAvatar from 'src/components/User/NamedAvatar'
import { User } from 'src/components/User/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import queries from './queries.gql'

export interface GetUserNamedAvatarDataQuery {
  me: {
    id: User['id']
    firstName: User['firstName']
    fullName: User['fullName']
    picture: User['picture']
    companies: [
      {
        id: Team['id']
        name: Team['name']
      },
    ]
  }
}

const Me = () => {
  const [me, setMe] = useRecoilState(meAtom)
  const loadUser = useRecoilFamilyLoader(userAtomFamily)
  const user = useRecoilValue(userAtomFamily(me))
  const { loading } = useQuery<GetUserNamedAvatarDataQuery>(queries.GET_USER_NAMED_AVATAR_DATA, {
    onCompleted: (data) => {
      setMe(data.me.id)
      loadUser(data.me)
    },
  })

  return (
    <NamedAvatar
      name={user?.fullName}
      picture={user?.picture}
      company={user?.companies?.[0]?.name}
      isLoading={loading}
    />
  )
}

export default Me
