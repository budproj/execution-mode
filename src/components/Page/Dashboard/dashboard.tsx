import { useQuery } from '@apollo/client'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { CADENCE } from 'src/components/Cycle/constants'
import MissionControlWrapper from 'src/components/MissionControl/wrapper'
import BoardsOverview from 'src/components/Report/BoardsOverview'
import MetricsOverview from 'src/components/Report/MetricsOverview'
import { OverviewSummary } from 'src/components/Report/OverviewSummary'
import TeamsOverview from 'src/components/Report/TeamsOverview'
import { useGetCompanyCycles } from 'src/components/Report/hooks'
import { Team } from 'src/components/Team/types'
import { UserProfileHeader } from 'src/components/User/Profile/Header/wrapper'
import { TeamsMenuProfile } from 'src/components/User/Profile/TeamsMenu'
import { User } from 'src/components/User/types'
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
    picture: string
    gender: string
    role: User['role']
    settings: {
      edges: Array<{ node: { preferences: string } }>
    }
    companies: GraphQLConnection<Team>
  }
  teams: GraphQLConnection<Team>
}

interface PreferencesProperties {
  main_team: string
}

const StyledDiv = styled('div')`
  width: 100%;
  position: absolute;
  bottom: 0;

  > div {
    position: unset !important;
  }

  .image {
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`

const StyledStack = styled(Stack)`
  @media (min-width: 730px) {
    gap: 50px;

    > div {
      height: 75vh;
    }
  }

  @media (min-width: 1260px) {
    gap: 50px;

    > div {
      height: 48vh;
    }
  }

  @media (min-width: 1280px) {
    gap: 50px;

    > div {
      height: 60vh;
    }
  }

  @media (min-width: 1360px) {
    gap: 55px;

    > div {
      height: 55vh;
    }
  }

  @media (min-width: 1366px) {
    gap: 75px;

    > div {
      height: 65vh;
    }
  }

  @media (min-width: 1600px) {
    gap: 45px;

    > div {
      height: 50vh;
    }
  }

  @media (min-width: 1680px) {
    gap: 45px;

    > div {
      height: 50vh;
    }
  }

  @media (min-width: 1690px) {
    gap: 65px;

    > div {
      height: 40vh;
    }
  }

  @media (min-width: 1750px) {
    gap: 20px;

    > div {
      height: 45vh;
    }
  }

  @media (min-width: 1920px) {
    gap: 40px;

    > div {
      height: 50vh;
    }
  }

  @media (min-width: 1925px) {
    gap: 45px;

    > div {
      height: 45vh;
    }
  }

  @media (min-width: 2220px) {
    gap: 15px;

    > div {
      height: 38vh;
    }
  }

  @media (min-width: 2290px) {
    gap: 15px;

    > div {
      height: 44vh;
    }
  }

  @media (min-width: 2560px) {
    gap: 15px;

    > div {
      height: 35vh;
    }
  }
`

const StyledMCWrapper = styled(MissionControlWrapper)`
  @media (min-width: 1600px) {
    top: 225px;
  }

  @media (max-width: 1417px) {
    top: 195px;
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

  const activeCompanyCycles = allCompanyCycles.filter((cycle) => cycle.active)

  const yearly = activeCompanyCycles.find((cycle) => cycle.cadence === CADENCE.YEARLY)
  const quarter = activeCompanyCycles.find((cycle) => cycle.cadence === CADENCE.QUARTERLY)

  const pageTitle =
    called && !loading && intl.formatMessage(messages.greeting, { name: data?.me.firstName })

  const selectedDashboardTeam = useRecoilValue(selectedDashboardTeamAtom)

  const isCompanySelected = data?.me.companies.edges[0].node.id === selectedDashboardTeam?.id

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
    if (data) setEdges(data.teams.edges)
  }, [data, setEdges])

  return (
    <StyledStack bg="new-gray.50">
      <Box bg="brand.500" position="relative" zIndex={2}>
        <Stack>
          <TeamsMenuProfile mainTeamId={mainTeamId} teams={teams} setMainTeam={setMainTeamId} />
          <PageHeader display="flex" gap={8} alignItems="center" py={10} px={20} flexGrow={1}>
            <UserProfileHeader
              canUpdate
              onlyPicture
              userProps={{ picture: data?.me.picture, role: data?.me.role }}
              isLoaded={!loading}
              variantAvatar="circle"
            />
            <PageTitle id="greeting-user" color="white" fontSize={36}>
              {pageTitle}
            </PageTitle>
          </PageHeader>
        </Stack>
        <StyledDiv>
          <Image fill src="/images/shape-footer-teste.svg" className="image" alt="mudar" />
        </StyledDiv>
        {data?.me.id && selectedDashboardTeam?.id && (
          <StyledMCWrapper
            position="absolute"
            userID={data.me.id}
            teamID={selectedDashboardTeam?.id}
            pr={20}
          />
        )}
      </Box>
      <PageContent py={0}>
        <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

        <Stack>
          <Text color="new-gray.800" fontWeight={500} fontSize="18px" marginBottom="8px">
            {intl.formatMessage(messages.okrOverViewTitle)}
          </Text>

          <Flex gridGap="3rem">
            <OverviewSummary
              title={intl.formatMessage(messages.yearlySummaryTitle, { year: yearly?.period })}
              cycle={yearly}
              isLoading={companyCyclesLoading}
              flex="1"
            />
            {isCompanySelected ? (
              <OverviewSummary
                title={intl.formatMessage(messages.quarterlySummaryTitle, {
                  quarter: quarter?.period,
                })}
                cycle={quarter}
                isLoading={companyCyclesLoading}
                flex="1"
              />
            ) : (
              <OverviewSummary
                title={intl.formatMessage(messages.quarterlySummaryTitleTeam, {
                  quarter: quarter?.period,
                  team: selectedDashboardTeam?.name,
                })}
                team={selectedDashboardTeam}
                isLoading={companyCyclesLoading}
                flex="1"
              />
            )}
          </Flex>
          <BoardsOverview
            isCompany={isCompanySelected}
            selectedDashboardTeam={selectedDashboardTeam}
            pt="2rem"
          />
        </Stack>

        <Box mt="36px" pb="60px">
          <Text color="new-gray.800" fontWeight={500} fontSize="18px" marginBottom="12px">
            {intl.formatMessage(messages.teamsOverviewTitle)}
          </Text>
          <Flex gridGap="3rem">
            <TeamsOverview flex="1" quarter={quarter?.period} />
            <MetricsOverview maxWidth="50%" flex="1" />
          </Flex>
        </Box>
      </PageContent>
    </StyledStack>
  )
}

export default DashboardPage
