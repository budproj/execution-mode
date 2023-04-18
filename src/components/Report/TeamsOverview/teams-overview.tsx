import { useQuery } from '@apollo/client'
import { Box, Divider, StyleProps } from '@chakra-ui/react'
import { useFlags } from 'flagsmith/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { Cycle } from 'src/components/Cycle/types'
import { CardHeader } from 'src/components/Report/CardHeaders'
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

const ScrollableItem = getScrollableItem()

const TeamsOverview = ({ quarter, ...rest }: TeamsOverviewProperties) => {
  const intl = useIntl()
  const flags = useFlags(['view_gamification_teams_ranking'])
  const isGameficationDisabled = !flags.view_gamification_teams_ranking.enabled

  const { data, loading } = useQuery<GetCompanyTeamsQuery>(queries.GET_COMPANY_TEAMS, {
    fetchPolicy: 'network-only',
  })
  const [rankedTeams, setRankedTeamsEdges] = useConnectionEdges<Team>()

  const [loadTeam] = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const company = data?.teams?.edges?.[0]?.node

  const orderedTeams = isGameficationDisabled
    ? rankedTeams.sort((a, b) => (a.name > b.name ? 1 : -1))
    : rankedTeams

  useEffect(() => {
    if (company) setRankedTeamsEdges(company?.rankedDescendants?.edges)
  }, [company, setRankedTeamsEdges])

  useEffect(() => {
    if (!loading && company) loadTeam(company)
  }, [company, loading, loadTeam])

  return (
    <Box bg="white" borderRadius="lg" shadow="for-background.light" px={8} py={5} {...rest}>
      <CardHeader
        loading={loading}
        title={intl.formatMessage(
          isGameficationDisabled
            ? messages.teamRankingTitleWithoutGamification
            : messages.teamRankingTitle,
        )}
        subtitle={intl.formatMessage(messages.teamRankingSubTitle)}
      />
      <Divider />
      {orderedTeams.length === 0 ? (
        <TeamsOverviewBodyTableSkeleton />
      ) : (
        <ScrollableItem maxHeight="410px" p="0 12px">
          <TeamsOverviewBodyTableBody
            isGameficationDisabled={isGameficationDisabled}
            teamsRanking={orderedTeams}
          />
        </ScrollableItem>
      )}
    </Box>
  )
}

export default TeamsOverview
