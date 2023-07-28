import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import NamedAvatar from 'src/components/User/NamedAvatar'

import getConfig from '../../../config'
import { useAmplitude } from '../../../state/hooks/useAmplitude/hook'
import {
  marshalAmplitudeUser,
  marshalAmplitudeUserGroups,
} from '../../../state/hooks/useAmplitude/marshal-amplitude-user'
import { myselfAtom } from '../../../state/recoil/shared/atoms'
import { Team } from '../../Team/types'
import { GraphQLConnection } from '../../types'
import { USER_GENDER } from '../constants'
import { UserProgress } from '../types'

export interface UserNamedAvatarDataQuery {
  id: string
  firstName: string
  fullName: string
  picture: string
  email: string
  gender: USER_GENDER
  role: string
  isTeamLeader: boolean
  createdAt: string
  companies: GraphQLConnection<Team>
  teams: GraphQLConnection<Team>
  yearlyProgress: UserProgress
  quarterlyProgress: UserProgress
}

const Me = () => {
  const { user } = useAuth0()
  const { publicRuntimeConfig } = getConfig()
  const { identify } = useAmplitude()
  const myself = useRecoilValue(myselfAtom)

  useEffect(() => {
    if (myself && user) {
      const { apiDomain } = publicRuntimeConfig.auth0
      const userData = {
        ...myself,
        permissions: user[`${apiDomain}/roles`],
      }

      identify(userData.id, marshalAmplitudeUser(userData), marshalAmplitudeUserGroups(userData))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myself, user?.sub])

  return useMemo(
    () => <NamedAvatar userID={myself?.id} user={myself} isLoading={!myself} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [myself?.id],
  )
}

export default Me
