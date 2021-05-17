import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { ApolloQueryErrorBoundary, PageContent, PageHead } from 'src/components/Base'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { PageProperties } from 'src/components/Page/types'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { pageTitleAtom } from 'src/state/recoil/page'
import { teamAtomFamily } from 'src/state/recoil/team'

import { ChildTeamsWrapper } from './ChildTeams/wrapper'
import { TeamMembersWrapper } from './Members/wrapper'
import { TeamObjectivesWrapper } from './Objectives/wrapper'
import messages from './messages'
import queries from './queries.gql'
import { GetTeamNameQuery } from './types'

export interface ExploreTeamPageProperties extends PageProperties {
  teamId: Team['id']
}

const ExploreTeamPage = ({ teamId, isRootPage }: ExploreTeamPageProperties) => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const { data, loading, error } = useQuery<GetTeamNameQuery>(queries.GET_TEAM_NAME, {
    variables: {
      teamId,
    },
  })
  const loadTeamOnRecoil = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const teamName = data?.team.name
  const metaTitleLoadingFallback = intl.formatMessage(messages.metaTitleLoadingFallback)

  const breadcrumbParameters = {
    id: teamName ?? '',
  }

  useEffect(() => {
    if (!data && loading) setPageTitle('')
  }, [data, loading, setPageTitle])

  useEffect(() => {
    if (!loading && data) setPageTitle(data?.team.name)
  }, [loading, data, setPageTitle])

  useEffect(() => {
    if (!loading && data) loadTeamOnRecoil(data?.team)
  }, [data, loading, loadTeamOnRecoil])

  return (
    <ApolloQueryErrorBoundary error={error}>
      <PageContent
        breadcrumbParams={breadcrumbParameters}
        showBreadcrumb={!isRootPage}
        bg="black.50"
      >
        <KeyResultSingleDrawer />
        <PageHead
          title={messages.metaTitle}
          description={messages.metaDescription}
          titleValues={{ team: teamName ?? metaTitleLoadingFallback }}
        />

        <Stack direction="row" w="full">
          <TeamObjectivesWrapper teamID={teamId} />

          <Stack spacing={6} flexGrow={1}>
            <TeamMembersWrapper />
            <ChildTeamsWrapper />
          </Stack>
        </Stack>
      </PageContent>
    </ApolloQueryErrorBoundary>
  )
}

export default ExploreTeamPage
