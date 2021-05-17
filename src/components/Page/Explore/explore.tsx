import React from 'react'
import { useIntl } from 'react-intl'

import PageContent from 'src/components/Base/PageContent'
import TeamCardList from 'src/components/Team/CardList'

import { PageMetaHead, PageTitle } from '../../Base'
import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'

const ExplorePage = () => {
  const intl = useIntl()

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
      </PageHeader>

      <TeamCardList />
    </PageContent>
  )
}

export default ExplorePage
