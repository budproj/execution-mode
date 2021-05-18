import { useQuery } from '@apollo/client'
import { Box, Stack } from '@chakra-ui/layout'
import { Grid, GridItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { ApolloQueryErrorBoundary, PageContent, PageMetaHead } from 'src/components/Base'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { PageProperties } from 'src/components/Page/types'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import { TeamActiveObjectives } from '../../Team/ActiveObjectives/wrapper'

import { ChildTeamsWrapper } from './ChildTeams/wrapper'
import { TeamHeader } from './Header/wrapper'
import { TeamMembersWrapper } from './Members/wrapper'
import messages from './messages'
import queries from './queries.gql'
import { GetTeamNameQuery } from './types'

export interface ExploreTeamPageProperties extends PageProperties {
  teamId: Team['id']
}

const ExploreTeamPage = ({ teamId }: ExploreTeamPageProperties) => {
  const intl = useIntl()
  const { data, loading, error, called } = useQuery<GetTeamNameQuery>(queries.GET_TEAM_NAME, {
    variables: {
      teamId,
    },
  })
  const loadTeamOnRecoil = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const metaTitleLoadingFallback = intl.formatMessage(messages.metaTitleLoadingFallback)

  useEffect(() => {
    if (!loading && data) loadTeamOnRecoil(data?.team)
  }, [data, loading, loadTeamOnRecoil])

  return (
    <ApolloQueryErrorBoundary error={error}>
      <PageContent bg="black.50">
        <PageMetaHead
          title={messages.metaTitle}
          description={messages.metaDescription}
          titleValues={{ team: data?.team.name ?? metaTitleLoadingFallback }}
        />
        <KeyResultSingleDrawer />

        <Grid templateColumns="2fr 1fr" gridGap="8">
          <GridItem>
            <TeamHeader isLoaded={called && !loading} team={data?.team} />
          </GridItem>

          <Box />

          <GridItem>
            <TeamActiveObjectives teamID={teamId} />
          </GridItem>

          <GridItem>
            <Stack direction="column" h="full" spacing="8">
              <TeamMembersWrapper />
              <ChildTeamsWrapper />
            </Stack>
          </GridItem>
        </Grid>
      </PageContent>
    </ApolloQueryErrorBoundary>
  )
}

export default ExploreTeamPage
