import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { CADENCE } from 'src/components/Cycle/constants'
import BoardsOverview from 'src/components/Report/BoardsOverview'
import { OverviewSummary } from 'src/components/Report/OverviewSummary'
import TeamsOverview from 'src/components/Report/TeamsOverview'
import { useGetCompanyCycles } from 'src/components/Report/hooks'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'
import queries from './queries.gql'

const DashboardPage = () => {
  const intl = useIntl()
  const { data, loading, called } = useQuery(queries.GET_USER_NAME_AND_GENDER)
  const { data: companyCycles, loading: companyCyclesLoading } = useGetCompanyCycles()
  const { firstName, gender } = data?.me ?? {}

  const yearly = companyCycles.find((cycle) => cycle.cadence === CADENCE.YEARLY)
  const quarter = companyCycles.find((cycle) => cycle.cadence === CADENCE.QUARTERLY)

  const pageTitle =
    called && !loading && intl.formatMessage(messages.greeting, { name: firstName, gender })

  return (
    <PageContent bg="new-gray.50">
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{pageTitle}</PageTitle>
      </PageHeader>

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

      <TeamsOverview mt={10} quarter={quarter?.period} />
    </PageContent>
  )
}

export default DashboardPage
