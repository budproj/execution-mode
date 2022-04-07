import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import CompanyProgressOverview from 'src/components/Report/CompanyProgressOverview'
import { OverviewSummary } from 'src/components/Report/OverviewSummary'
import TeamsOverview from 'src/components/Report/TeamsOverview'
import { useGetCompanyCycles } from 'src/components/Report/hooks'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'
import queries from './queries.gql'

const getCurrentDateInfo = () => {
  const currentDate = new Date()

  return {
    currentYear: currentDate.getFullYear(),
    currentMonth: currentDate.getMonth(),
  }
}

const DashboardPage = () => {
  const intl = useIntl()
  const { data, loading, called } = useQuery(queries.GET_USER_NAME_AND_GENDER)
  const { data: companyCycles, loading: companyCyclesLoading } = useGetCompanyCycles()
  const { firstName, gender } = data?.me ?? {}

  const currentYear = useMemo(() => getCurrentDateInfo().currentYear, [])
  const currentMonth = useMemo(() => getCurrentDateInfo().currentMonth, [])
  const currentQuarter = useMemo(() => {
    if (currentMonth < 3) return 'Q1'
    if (currentMonth < 6) return 'Q2'
    if (currentMonth < 9) return 'Q3'
    if (currentMonth < 12) return 'Q4'
    return ''
  }, [currentMonth])

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
          title={intl.formatMessage(messages.yearlySummaryTitle, { year: currentYear })}
          progress={undefined}
          deltaProgress={6}
          flex="1"
        />
        <OverviewSummary
          title={intl.formatMessage(messages.quarterlySummaryTitle, { quarter: currentQuarter })}
          progress={30}
          deltaProgress={4}
          flex="1"
        />
      </Flex>

      <Flex gridGap={10} direction="column">
        <CompanyProgressOverview />
        <TeamsOverview />
      </Flex>

      <TeamsOverview mt={10} quarter={quarter?.period} />
    </PageContent>
  )
}

export default DashboardPage
