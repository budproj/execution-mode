import { useQuery } from '@apollo/client'
import { Box, Flex, Stack, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { CADENCE } from 'src/components/Cycle/constants'
import MissionControlWrapper from 'src/components/MissionControl/wrapper'
import BoardsOverview from 'src/components/Report/BoardsOverview'
import MetricsOverview from 'src/components/Report/MetricsOverview'
import TeamsOverview from 'src/components/Report/TeamsOverview'
import { useGetCompanyCycles } from 'src/components/Report/hooks'
import { Team } from 'src/components/Team/types'
import { UserProfileHeader } from 'src/components/User/Profile/Header/wrapper'
import { TeamsMenuProfile } from 'src/components/User/Profile/TeamsMenu'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { selectedDashboardTeamAtom } from 'src/state/recoil/team/selected-dashboard-team'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'
import queries from './queries.gql'

interface GetUserNameGenderAndSettingsRequest {
  me: {
    id: string
    firstName: string
    gender: string
    settings: {
      edges: Array<{ node: { preferences: string } }>
    }
    teams: GraphQLConnection<Team>
    companies: GraphQLConnection<Team>
  }
}

interface PreferencesProperties {
  main_team: string
}

const StyledDiv = styled('div')`
  width: 100%;
  position: absolute;
  bottom: -70px;

  > div {
    position: unset !important;
  }

  .image {
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`

const DashboardPage = () => {
  const intl = useIntl()
  const { data, loading, called } = useQuery<GetUserNameGenderAndSettingsRequest>(
    queries.GET_USER_NAME_AND_GENDER_AND_SETTINGS,
  )

  const [teams, setEdges] = useConnectionEdges<Team>()
  const [mainTeamId, setMainTeamId] = useState('')

  const { data: allCompanyCycles, loading: companyCyclesLoading } = useGetCompanyCycles()
  const { firstName, id: userID } = data?.me ?? {}

  const activeCompanyCycles = allCompanyCycles.filter((cycle) => cycle.active)

  const yearly = activeCompanyCycles.find((cycle) => cycle.cadence === CADENCE.YEARLY)
  const quarter = activeCompanyCycles.find((cycle) => cycle.cadence === CADENCE.QUARTERLY)

  const pageTitle = called && !loading && intl.formatMessage(messages.greeting, { name: firstName })

  const [selectedDashboardTeam, setSelectedDashboardTeam] =
    useRecoilState(selectedDashboardTeamAtom)

  useEffect(() => {
    if (data?.me.settings.edges[0]) {
      const parsedPreferences: PreferencesProperties = JSON.parse(
        data?.me.settings.edges[0]?.node.preferences,
      )
      const mainTeamId = parsedPreferences.main_team
      setMainTeamId(mainTeamId)
    }
  }, [data?.me.settings.edges])

  useEffect(() => {
    if (data) setEdges([...data.me.teams.edges, ...data.me.companies.edges])
  }, [data, setEdges])

  return (
    <Stack position="relative">
      <Box bg="brand.500" h="55vh" position="relative">
        <TeamsMenuProfile mainTeamId={mainTeamId} teams={teams} setMainTeam={setMainTeamId} />
        <PageHeader display="flex" gap={8} alignItems="center" py={10} px={20} flexGrow={1}>
          <UserProfileHeader
            canUpdate
            onlyPicture
            userID={userID}
            isLoaded={!loading}
            variantAvatar="circle"
          />
          <PageTitle id="greeting-user" color="white" fontSize={36}>
            {pageTitle}
          </PageTitle>
        </PageHeader>
        <StyledDiv>
          <Image fill src="/images/shape-footer.svg" className="image" alt="mudar" />
        </StyledDiv>
      </Box>
      <MissionControlWrapper position="absolute" top="28vh" />
      <PageContent bg="new-gray.50">
        <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

        <VStack alignItems="flex-start" gap={1}>
          <Text color="gray.500" fontWeight="bold" fontSize="14px" textTransform="uppercase">
            {intl.formatMessage(messages.okrOverViewTitle)}
          </Text>
          {/* <Flex gridGap="3rem">
          <OverviewSummary
            title={intl.formatMessage(messages.yearlySummaryTitle, { year: yearly?.period })}
            cycle={yearly}
            isLoading={companyCyclesLoading}
            flex="1"
          />
          <OverviewSummary
            title={intl.formatMessage(messages.quarterlySummaryTitle, { quarter: quarter?.period })}
            cycle={quarter}
            isLoading={companyCyclesLoading}
            flex="1"
          />
        </Flex> */}
          <BoardsOverview mt="0px !important" w="100%" />
        </VStack>

        <Box mt="36px">
          <Text color="new-gray.800" fontWeight={500} fontSize="18px" marginBottom="12px">
            {intl.formatMessage(messages.teamsOverviewTitle)}
          </Text>
          <Flex gridGap="3rem">
            <TeamsOverview flex="1" quarter={quarter?.period} />
            <MetricsOverview maxWidth="50%" flex="1" />
          </Flex>
        </Box>
      </PageContent>
    </Stack>
  )
}

export default DashboardPage
