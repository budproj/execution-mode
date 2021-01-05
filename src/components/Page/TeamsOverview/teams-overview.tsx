import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import { PageProperties } from 'src/components/Page/types'
import TeamCardList from 'src/components/Team/CardList'
import { pageTitleAtom } from 'src/state/recoil/page'

import messages from './messages'

const TeamsOverviewPage = ({ isRootPage }: PageProperties) => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent showBreadcrumb={!isRootPage}>
      <TeamCardList />
    </PageContent>
  )
}

export default TeamsOverviewPage
