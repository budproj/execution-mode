import { useQuery } from '@apollo/client'
import React from 'react'

import queries from 'src/components/Company/queries.gql'

const TeamViewCardList = () => {
  const { data, loading } = useQuery(queries.GET_ROOT_TEAMS)

  console.log(data, loading, 'tag')

  return <p>Ok</p>
}

export default TeamViewCardList
