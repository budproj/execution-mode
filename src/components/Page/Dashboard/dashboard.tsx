import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import CompanyProgressOverview from 'src/components/Report/CompanyProgressOverview'
import TeamsOverview from 'src/components/Report/TeamsOverview'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'
import queries from './queries.gql'

const DashboardPage = () => {
  const intl = useIntl()
  const { data, loading, called } = useQuery(queries.GET_USER_NAME_AND_GENDER)
  const { firstName, gender } = data?.me ?? {}

  const pageTitle =
    called && !loading && intl.formatMessage(messages.greeting, { name: firstName, gender })

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{pageTitle}</PageTitle>
      </PageHeader>

      <Flex gridGap={10} direction="column">
        <CompanyProgressOverview />
        <TeamsOverview />
      </Flex>
    </PageContent>
  )
}

export default DashboardPage
