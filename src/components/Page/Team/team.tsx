import { useQuery } from '@apollo/client'
import { Box, Flex, Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { ApolloQueryErrorBoundary, PageMetaHead } from 'src/components/Base'
import { PageProperties } from 'src/components/Page/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useLoadCompanyUsers } from 'src/state/hooks/useLoadCompanyUsers'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { isReloadNecessary, teamAtomFamily } from 'src/state/recoil/team'

import { KeyResultInsertDrawer } from '../../KeyResult/InsertDrawer/wrapper'

import { TeamHeader } from './Header/wrapper'
import ExploreTeamTabs from './Tabs/wrapper'
import messages from './messages'
import queries from './queries.gql'
import { GetTeamNameQuery } from './types'

export interface ExploreTeamPageProperties extends PageProperties {
  teamId: Team['id']
}

const StyledDiv = styled('div')`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: -1;

  > div {
    position: unset !important;
  }

  .image {
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`

const ExploreTeamPage = ({ teamId }: ExploreTeamPageProperties) => {
  const intl = useIntl()
  const router = useRouter()
  const { loadCompanyUsers } = useLoadCompanyUsers()
  const [users, setUsersEdges] = useConnectionEdges<User>()

  const [activeTab, setActiveTab] = useState(
    intl.formatMessage(messages.okrsTeamTab).toLocaleLowerCase(),
  )

  const tabs = new Set(['okrs', 'retrospective'])

  const { data, loading, error, called, refetch } = useQuery<GetTeamNameQuery>(
    queries.GET_TEAM_DATA,
    { variables: { teamId } },
  )

  useEffect(() => {
    loadCompanyUsers()
  }, [loadCompanyUsers])

  useEffect(() => {
    if (data?.team?.users) {
      setUsersEdges(data.team.users.edges)
    }
  }, [data, setUsersEdges])

  useEffect(() => {
    const { query: routerQuery } = router
    const routerTab = Array.isArray(routerQuery?.activeTab)
      ? routerQuery?.activeTab[0]
      : routerQuery?.activeTab ?? ''

    if (tabs.has(routerTab) && routerTab !== activeTab) {
      setActiveTab(routerTab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

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

  console.log({ data })

  return (
    <ApolloQueryErrorBoundary error={error}>
      <Flex flexGrow={1} direction="column" bg="new-gray.50">
        <Box bg="brand.500" position="relative" zIndex={2} overflow="hidden">
          <StyledDiv>
            <Image fill src="/images/shape-footer-teste.svg" className="image" alt="mudar" />
          </StyledDiv>

          <Stack
            zIndex={2}
            paddingBottom="0"
            borderColor="new-gray.400"
            bg="white"
            flex="unset"
            marginX="83px"
            marginTop="40px"
            marginBottom="24px"
            borderRadius="10px"
          >
            <Stack zIndex={2} display="flex" py={10} px={20} flexGrow={1} direction="column">
              <PageMetaHead
                title={messages.metaTitle}
                description={messages.metaDescription}
                titleValues={{ team: data?.team.name ?? metaTitleLoadingFallback }}
              />
              <KeyResultInsertDrawer teamID={teamId} />

              <Stack spacing={8}>
                <Stack direction="row" zIndex="2">
                  <TeamHeader
                    isLoaded={called && !loading}
                    team={data?.team}
                    teamOwnerId={data?.team.ownerId}
                    showProgress={
                      activeTab === intl.formatMessage(messages.okrsTeamTab).toLocaleLowerCase()
                    }
                    users={users}
                  />
                  {/* {activeTab === intl.formatMessage(messages.okrsTeamTab).toLocaleLowerCase() && (
                  <Box w="28rem">
                    <MenuHeader teamId={teamId} />
                  </Box>
                )} */}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <ExploreTeamTabs activeTab={activeTab} teamId={teamId} isLoading={isLoading} />
      </Flex>
    </ApolloQueryErrorBoundary>
  )
}

export default ExploreTeamPage
