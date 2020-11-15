import React, { ReactElement, useEffect } from 'react'
import { defineMessages, useIntl, MessageDescriptor } from 'react-intl'
import { useRecoilState } from 'recoil'

import PageContent from 'components/Base/PageContent'
import KeyResultList from 'components/KeyResult/List'
import { pageTitle as pageTitleAtom } from 'state/recoil/page/title'

const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Minhas Key Results',
    id: 'tf3MiP',
    description: 'The page title that our users should see',
  },
}) as Record<string, MessageDescriptor>

const MyKeyResultsIndex = (): ReactElement => {
  const setPageTitle = useRecoilState(pageTitleAtom)[1]
  const intl = useIntl()

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent>
      <KeyResultList />
    </PageContent>
  )
}

export default MyKeyResultsIndex
