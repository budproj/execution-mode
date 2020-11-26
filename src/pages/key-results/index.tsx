import React, { ReactElement, useEffect } from 'react'
import { defineMessages, useIntl, MessageDescriptor } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import PageContent from 'components/Base/PageContent'
import KeyResultView from 'components/KeyResult/View'
import { pageTitleAtom } from 'state/recoil/page'

const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Minhas Key Results',
    id: 'tf3MiP',
    description: 'The page title that our users should see',
  },
}) as Record<string, MessageDescriptor>

const MyKeyResultsIndex = (): ReactElement => {
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const intl = useIntl()

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent>
      <KeyResultView />
    </PageContent>
  )
}

export default MyKeyResultsIndex
