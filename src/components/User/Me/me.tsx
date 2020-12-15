import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import NamedAvatar from 'src/components/User/NamedAvatar'
import queries from 'src/components/User/queries.gql'
import { User } from 'src/components/User/types'

const Me = () => {
  const [userData, setUserData] = useState<User>({} as User)
  const { data, loading } = useQuery(queries.GET_USER_NAMED_AVATAR_DATA)

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
