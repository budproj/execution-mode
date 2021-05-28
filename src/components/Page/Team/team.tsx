import { useQuery } from '@apollo/client'
import { Box, Stack } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { ApolloQueryErrorBoundary, PageContent, PageMetaHead } from 'src/components/Base'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { PageProperties } from 'src/components/Page/types'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import { KeyResultInsertDrawer } from '../../KeyResult/InsertDrawer/wrapper'
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
  const isLoading = loading || !called

  useEffect(() => {
    if (!loading && data) loadTeamOnRecoil(data.team)
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
        <KeyResultInsertDrawer />

        <Stack spacing={8}>
          <Stack direction="row">
            <TeamHeader isLoaded={called && !loading} team={data?.team} />
            <Box w="28rem" />
          </Stack>

          <Stack direction="row" spacing={8} maxH="100%">
            <Box flexGrow={1}>
              <TeamActiveObjectives teamID={teamId} />
            </Box>

            <Stack spacing="8" w="md" minW="md" maxH="4xl">
              <TeamMembersWrapper teamID={teamId} isLoading={isLoading} />
              <ChildTeamsWrapper teamID={teamId} isLoading={isLoading} />
            </Stack>
          </Stack>
        </Stack>
      </PageContent>
    </ApolloQueryErrorBoundary>
  )
}

export default ExploreTeamPage
