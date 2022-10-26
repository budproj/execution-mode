import { useQuery } from '@apollo/client'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { CADENCE } from 'src/components/Cycle/constants'
import BoardsOverview from 'src/components/Report/BoardsOverview'
import MetricsOverview from 'src/components/Report/MetricsOverview'
import { OverviewSummary } from 'src/components/Report/OverviewSummary'
import TeamsOverview from 'src/components/Report/TeamsOverview'
import { useGetCompanyCycles } from 'src/components/Report/hooks'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'
import queries from './queries.gql'

const DashboardPage = () => {
  const intl = useIntl()
  const { data, loading, called } = useQuery(queries.GET_USER_NAME_AND_GENDER)
  const { data: allCompanyCycles, loading: companyCyclesLoading } = useGetCompanyCycles()
  const { firstName, gender } = data?.me ?? {}

  const activeCompanyCycles = allCompanyCycles.filter((cycle) => cycle.active)

  const yearly = activeCompanyCycles.find((cycle) => cycle.cadence === CADENCE.YEARLY)
  const quarter = activeCompanyCycles.find((cycle) => cycle.cadence === CADENCE.QUARTERLY)

  const pageTitle = called && !loading && intl.formatMessage(messages.greeting, { name: firstName })

  return (
    <PageContent bg="new-gray.50">
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{pageTitle}</PageTitle>
      </PageHeader>

      <Box>
        <Text color="new-gray.800" fontWeight={500} fontSize="18px" marginBottom="12px">
          {intl.formatMessage(messages.okrOverViewTitle)}
        </Text>
        <Flex gridGap="3rem">
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
        </Flex>
        <BoardsOverview />
      </Box>

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
  )
}

export default DashboardPage
