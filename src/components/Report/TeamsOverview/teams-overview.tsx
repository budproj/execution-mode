import { useQuery } from '@apollo/client'
import { Box, Heading, Skeleton, StyleProps } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { Cycle } from 'src/components/Cycle/types'
import { Team } from 'src/components/Team/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import { TeamsOverviewBodyTableBody, TeamsOverviewBodyTableSkeleton } from './Body/Table'
import messages from './messages'
import queries from './queries.gql'

export interface GetCompanyTeamsQuery {
  teams: GraphQLConnection<Team>
}

export interface TeamsOverviewProperties extends StyleProps {
  quarter: Cycle['period'] | undefined
}

const TeamsOverview = ({ quarter, ...rest }: TeamsOverviewProperties) => {
  const intl = useIntl()

  const { data, loading } = useQuery<GetCompanyTeamsQuery>(queries.GET_COMPANY_TEAMS, {
    fetchPolicy: 'network-only',
  })
  const [rankedTeams, setRankedTeamsEdges] = useConnectionEdges<Team>()

  const [loadTeam] = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const company = data?.teams?.edges?.[0]?.node

  useEffect(() => {
    if (company) setRankedTeamsEdges(company?.rankedDescendants?.edges)
  }, [company, setRankedTeamsEdges])

  useEffect(() => {
    if (!loading && company) loadTeam(company)
  }, [company, loading, loadTeam])

  return (
    <Box bg="white" borderRadius="lg" shadow="for-background.light" p={9} pb={4} {...rest}>
      <Skeleton isLoaded={!loading}>
        <Heading as="h3" size="md" mb={6}>
          {intl.formatMessage(messages.teamRankingTitle, { quarter })}
        </Heading>
      </Skeleton>
      {rankedTeams.length === 0 ? (
        <TeamsOverviewBodyTableSkeleton />
      ) : (
        <TeamsOverviewBodyTableBody teamsRanking={rankedTeams} />
      )}
    </Box>
  )
}

export default TeamsOverview
