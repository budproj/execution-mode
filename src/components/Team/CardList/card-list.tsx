import { useQuery } from '@apollo/client'
import { Grid } from '@chakra-ui/react'
import orderBy from 'lodash/orderBy'
import React, { useEffect } from 'react'

import { Team } from 'src/components/Team/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import TeamCard from './Card'
import queries from './queries.gql'
import { GetTeamsQuery } from './types'

export interface TeamCardListProperties {
  numEmptyStateCards: number
}

const TeamCardList = ({ numEmptyStateCards }: TeamCardListProperties) => {
  const { data, loading } = useQuery<GetTeamsQuery>(queries.GET_TEAMS)
  const [loadTeamsOnRecoil] = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const [teams, setEdges] = useConnectionEdges<Team>()

  const orderedTeams = orderBy(teams, ['isCompany', 'name'], ['desc', 'asc'])
  const wereTeamsLoaded = !loading && Boolean(teams)
  const emptyState = [...new Array(numEmptyStateCards)]

  useEffect(() => {
    if (wereTeamsLoaded) loadTeamsOnRecoil(orderedTeams)
  }, [wereTeamsLoaded, orderedTeams, loadTeamsOnRecoil])

  useEffect(() => {
    if (data) setEdges(data.teams.edges)
  }, [data, setEdges])

  return (
    <Grid gridGap={10} gridTemplateColumns="repeat(3, 1fr)">
      {wereTeamsLoaded
        ? orderedTeams?.map((team) => <TeamCard key={team.id} id={team.id} />)
        : emptyState.map(() => <TeamCard key={Math.random()} />)}
    </Grid>
  )
}

TeamCardList.defaultProps = {
  numEmptyStateCards: 3,
}

export default TeamCardList
