import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useRecoilState } from 'recoil'

import NamedAvatar from 'src/components/User/NamedAvatar'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'
import meAtom from 'src/state/recoil/user/me'

import getConfig from '../../../config'
import { useAmplitude } from '../../../state/hooks/useAmplitude/hook'
import {
  marshalAmplitudeUser,
  marshalAmplitudeUserGroups,
} from '../../../state/hooks/useAmplitude/marshal-amplitude-user'
import { Team } from '../../Team/types'
import { GraphQLConnection } from '../../types'
import { USER_GENDER } from '../constants'
import { UserProgress } from '../types'

import queries from './queries.gql'

export interface UserNamedAvatarDataQuery {
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
  yearlyProgress: UserProgress
  quarterlyProgress: UserProgress
}

export interface GetUserNamedAvatarDataQuery {
  me: UserNamedAvatarDataQuery
}

const Me = () => {
  const { user } = useAuth0()
  const { publicRuntimeConfig } = getConfig()
  const { identify } = useAmplitude()
  const [me, setMe] = useRecoilState(meAtom)
  const [loadUser] = useRecoilFamilyLoader(userAtomFamily)
  const { loading } = useQuery<GetUserNamedAvatarDataQuery>(queries.GET_USER_NAMED_AVATAR_DATA, {
    onCompleted: (data) => {
      setMe(data.me.id)
      loadUser(data.me)

      const { apiDomain } = publicRuntimeConfig.auth0
      const userData = {
        ...data.me,
        permissions: user?.[`${apiDomain}/roles`],
      }

      identify(userData.id, marshalAmplitudeUser(userData), marshalAmplitudeUserGroups(userData))
    },
  })

  return <NamedAvatar userID={me} isLoading={loading} />
}

export default Me
