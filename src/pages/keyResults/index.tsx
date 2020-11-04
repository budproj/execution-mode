import React, { ReactElement, useEffect } from 'react'
import { defineMessages, useIntl, MessageDescriptor } from 'react-intl'
import { useRecoilState } from 'recoil'

import PageContent from 'components/Base/PageContent'
import { title as pageTitleAtom } from 'state/atoms/page'

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
  }, [])

  return (
    <PageContent>
      <p>This is a test</p>
    </PageContent>
  )
}

export default MyKeyResultsIndex
