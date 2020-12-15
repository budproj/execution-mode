import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import PageContent from 'src/components/Base/PageContent'
import { pageTitleAtom } from 'src/state/recoil/page'

import messages from './messages'

const KeyResultsPage = () => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent>
      <p>Ok</p>
    </PageContent>
  )
}

export default KeyResultsPage
