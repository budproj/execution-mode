import { useQuery } from '@apollo/client'
import { Box, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { ApolloQueryErrorBoundary, PageContent, PageMetaHead } from 'src/components/Base'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { PageProperties } from 'src/components/Page/types'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { isReloadNecessary, teamAtomFamily } from 'src/state/recoil/team'

import { KeyResultInsertDrawer } from '../../KeyResult/InsertDrawer/wrapper'
import { TeamObjectives } from '../../Team/Objectives/wrapper'

import { ChildTeamsWrapper } from './ChildTeams/wrapper'
import { MenuHeader } from './Header/menu'
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
  const { data, loading, error, called, refetch } = useQuery<GetTeamNameQuery>(
    queries.GET_TEAM_DATA,
    { variables: { teamId } },
  )
  const [loadTeamOnRecoil] = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const metaTitleLoadingFallback = intl.formatMessage(messages.metaTitleLoadingFallback)
  const isLoading = loading || !called

  const [shouldUpdateTeams, setShouldUpdateTeams] = useRecoilState(isReloadNecessary)

  useEffect(() => {
    if (!loading && data) loadTeamOnRecoil(data.team)
  }, [data, loading, loadTeamOnRecoil])

  useEffect(() => {
    if (shouldUpdateTeams) {
      void refetch({ teamId })
      setShouldUpdateTeams(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdateTeams])

  return (
    <ApolloQueryErrorBoundary error={error}>
      <PageContent bg="new-gray.50">
        <PageMetaHead
          title={messages.metaTitle}
          description={messages.metaDescription}
          titleValues={{ team: data?.team.name ?? metaTitleLoadingFallback }}
        />
        <KeyResultSingleDrawer />
        <KeyResultInsertDrawer teamID={teamId} />

        <Stack spacing={8}>
          <Stack direction="row">
            <TeamHeader isLoaded={called && !loading} team={data?.team} />
            <Box w="28rem">
              <MenuHeader teamId={teamId} />
            </Box>
          </Stack>

          <Stack direction="row" spacing={8} maxH="100%">
            <Box flexGrow={1}>
              <TeamObjectives teamID={teamId} />
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
