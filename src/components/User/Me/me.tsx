import { useQuery } from '@apollo/client'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import NamedAvatar from 'src/components/User/NamedAvatar'
import { User } from 'src/components/User/types'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

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
  const setUser = useSetRecoilState(selectUser(me))
  const { loading } = useQuery<GetUserNamedAvatarDataQuery>(queries.GET_USER_NAMED_AVATAR_DATA, {
    onCompleted: (data) => {
      setMe(data.me.id)
      setUser(data.me)
    },
  })

  return <NamedAvatar userID={me} isLoading={loading} />
}

export default Me
