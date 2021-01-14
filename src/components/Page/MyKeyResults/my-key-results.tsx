import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { KeyResultView } from 'src/components/KeyResult'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import { PageProperties } from 'src/components/Page/types'
import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'
import { pageTitleAtom } from 'src/state/recoil/page'

import messages from './messages'

const MyKeyResultsPage = ({ isRootPage }: PageProperties) => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const setOpenDrawer = useSetRecoilState(keyResultOpenDrawer)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent showBreadcrumb={!isRootPage}>
      <PageHead title={messages.metaTitle} description={messages.metaDescription} />

      <KeyResultView onLineClick={handleLineClick} />
      <KeyResultSingleDrawer />
    </PageContent>
  )
}

export default MyKeyResultsPage
