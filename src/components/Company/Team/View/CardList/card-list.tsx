import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import React from 'react'

import queries from 'src/components/Company/queries.gql'
import { GetRootTeamsAndCompaniesQueryData } from 'src/components/Company/types'

import TeamCard from './Card'

const TeamViewCardList = () => {
  const { data, loading } = useQuery<GetRootTeamsAndCompaniesQueryData>(
    queries.GET_ROOT_TEAMS_AND_COMPANIES,
  )

  console.log(data)

  return (
    <Flex>
      {!loading && data ? (
        data.companies.map((company) => <TeamCard key={company.id} />)
      ) : (
        <TeamCard />
      )}
      {!loading && data ? data.teams.map((team) => <TeamCard key={team.id} />) : <TeamCard />}
    </Flex>
  )
}

export default TeamViewCardList
