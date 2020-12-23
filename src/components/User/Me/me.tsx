import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import NamedAvatar from 'src/components/User/NamedAvatar'
import { User } from 'src/components/User/types'

import queries from './queries.gql'

export interface GetUserNamedAvatarDataQuery {
  me: Partial<User>
}

const Me = () => {
  const [userData, setUserData] = useState<Partial<User>>({})
  const { data, loading } = useQuery<GetUserNamedAvatarDataQuery>(
    queries.GET_USER_NAMED_AVATAR_DATA,
  )

  useEffect(() => {
    if (data && data?.me !== userData) setUserData(data.me)
  }, [data, userData, setUserData])

  return (
    <NamedAvatar
      name={userData?.name}
      picture={userData?.picture}
      team="Apple"
      isLoading={loading}
    />
  )
}

export default Me
