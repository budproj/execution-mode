import { useQuery } from '@apollo/client'
import { Box, Flex, Stack, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { CADENCE } from 'src/components/Cycle/constants'
import MissionControlWrapper from 'src/components/MissionControl/wrapper'
import BoardsOverview from 'src/components/Report/BoardsOverview'
import MetricsOverview from 'src/components/Report/MetricsOverview'
import TeamsOverview from 'src/components/Report/TeamsOverview'
import { useGetCompanyCycles } from 'src/components/Report/hooks'
import { UserProfileHeader } from 'src/components/User/Profile/Header/wrapper'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'
import queries from './queries.gql'

const StyledDiv = styled('div')`
  width: 100%;
  position: absolute;
  bottom: -25px;

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
  const { data, loading, called } = useQuery(queries.GET_USER_NAME_AND_GENDER)
  const { data: allCompanyCycles, loading: companyCyclesLoading } = useGetCompanyCycles()
  const { firstName, id: userID } = data?.me ?? {}

  const activeCompanyCycles = allCompanyCycles.filter((cycle) => cycle.active)

  const yearly = activeCompanyCycles.find((cycle) => cycle.cadence === CADENCE.YEARLY)
  const quarter = activeCompanyCycles.find((cycle) => cycle.cadence === CADENCE.QUARTERLY)

  const pageTitle = called && !loading && intl.formatMessage(messages.greeting, { name: firstName })

  return (
    <Stack position="relative">
      <Box bg="brand.500" h="55vh" position="relative">
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
