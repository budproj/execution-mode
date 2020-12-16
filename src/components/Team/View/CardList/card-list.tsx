import { useQuery } from '@apollo/client'
import { Grid } from '@chakra-ui/react'
import React from 'react'

import queries from 'src/components/Team/queries.gql'
import { GetRootTeamsAndCompaniesQueryData } from 'src/components/Team/types'

import TeamCards from './team-cards'

const TeamViewCardList = () => {
  const { data, loading } = useQuery<GetRootTeamsAndCompaniesQueryData>(
    queries.GET_ROOT_TEAMS_AND_COMPANIES,
  )

  return (
    <Grid gridGap={10} gridTemplateColumns="repeat(3, 1fr)">
      <TeamCards teams={data?.teams} isLoading={loading} />
    </Grid>
  )
}

export default TeamViewCardList
