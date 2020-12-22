import { useQuery } from '@apollo/client'
import { Grid } from '@chakra-ui/react'
import React from 'react'

import queries from 'src/components/Team/queries.gql'
import { GetRootTeamsAndCompaniesQueryData } from 'src/components/Team/types'

import CompanyCards from './company-cards'
import TeamCards from './team-cards'

const TeamCardList = () => {
  const { data, loading } = useQuery<GetRootTeamsAndCompaniesQueryData>(
    queries.GET_ROOT_TEAMS_AND_COMPANIES,
  )

  return (
    <Grid gridGap={10} gridTemplateColumns="repeat(3, 1fr)">
      <CompanyCards companies={data?.companies} isLoading={loading} />
      <TeamCards teams={data?.teams} isLoading={loading} />
    </Grid>
  )
}

export default TeamCardList
