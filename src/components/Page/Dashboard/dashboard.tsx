import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import { PageProperties } from 'src/components/Page/types'
import CompanyProgressOverview from 'src/components/Report/CompanyProgressOverview'
import { pageTitleAtom } from 'src/state/recoil/page'

import messages from './messages'
import queries from './queries.gql'

const DashboardPage = ({ isRootPage }: PageProperties) => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const { data, loading } = useQuery(queries.GET_USER_NAME_AND_GENDER)
  const { name, gender } = data?.me ?? {}

  useEffect((): void => {
    if (!loading) setPageTitle(intl.formatMessage(messages.greeting, { name, gender }))
  }, [intl, loading, name, gender, setPageTitle])

  return (
    <PageContent showBreadcrumb={!isRootPage}>
      <CompanyProgressOverview />
    </PageContent>
  )
}

export default DashboardPage
