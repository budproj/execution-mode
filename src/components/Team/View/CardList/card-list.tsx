import { useQuery } from '@apollo/client'
import { Grid } from '@chakra-ui/react'
import React from 'react'

import queries from 'src/components/Team/queries.gql'
import { GetRootTeamsAndCompaniesQueryData } from 'src/components/Team/types'

import TeamCard from './Card'

const TeamViewCardList = () => {
  const { data, loading } = useQuery<GetRootTeamsAndCompaniesQueryData>(
    queries.GET_ROOT_TEAMS_AND_COMPANIES,
  )

  return (
    <Grid gridGap={10} gridTemplateColumns="repeat(3, 1fr)">
      {!loading && data ? (
        data.companies.map((company) => <TeamCard key={company.id} {...company} isCompany />)
      ) : (
        <TeamCard isCompany />
      )}
      {!loading && data ? (
        data.teams.map((team) => <TeamCard key={team.id} {...team} />)
      ) : (
        <TeamCard />
      )}
    </Grid>
  )
}

export default TeamViewCardList
