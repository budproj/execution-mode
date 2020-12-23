import { useQuery } from '@apollo/client'
import { Grid } from '@chakra-ui/react'
import React from 'react'

import { Company } from 'src/components/Company/types'
import { Team } from 'src/components/Team/types'

import CompanyCards from './company-cards'
import queries from './queries.gql'
import TeamCards from './team-cards'

export interface GetRootTeamsAndCompaniesQueryData {
  teams: Array<Partial<Team>>
  companies: Array<Partial<Company>>
}

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
