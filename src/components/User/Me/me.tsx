import { useQuery } from '@apollo/client'
import React from 'react'
import { useRecoilState } from 'recoil'

import NamedAvatar from 'src/components/User/NamedAvatar'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import { useAmplitude } from '../../../state/hooks/useAmplitude/hook'
import {
  marshalAmplitudeUser,
  marshalAmplitudeUserGroups,
} from '../../../state/hooks/useAmplitude/marshal-amplitude-user'
import { Team } from '../../Team/types'
import { GraphQLConnection } from '../../types'
import { USER_GENDER } from '../constants'

import queries from './queries.gql'

export interface GetUserNamedAvatarDataQuery {
  me: {
    id: string
    firstName: string
    fullName: string
    picture: string
    email: string
    gender: USER_GENDER
    role: string
    createdAt: string
    companies: GraphQLConnection<Team>
    teams: GraphQLConnection<Team>
  }
}

const Me = () => {
  const { identify } = useAmplitude()
  const [me, setMe] = useRecoilState(meAtom)
  const [loadUser] = useRecoilFamilyLoader(userAtomFamily)
  const { loading } = useQuery<GetUserNamedAvatarDataQuery>(queries.GET_USER_NAMED_AVATAR_DATA, {
    onCompleted: (data) => {
      setMe(data.me.id)
      loadUser(data.me)

      identify(data.me.id, marshalAmplitudeUser(data.me), marshalAmplitudeUserGroups(data.me))
    },
  })

  return <NamedAvatar userID={me} isLoading={loading} />
}

export default Me
