import { Box } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import MyKeyResultsPageSwitcher from 'src/components/Page/MyKeyResults/Switcher'
import { PageProperties } from 'src/components/Page/types'
import { keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'
import { pageTitleAtom } from 'src/state/recoil/page'

import messages from './messages'

const MyKeyResultsActiveCyclesPage = ({ isRootPage }: PageProperties) => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const setOpenDrawer = useSetRecoilState(keyResultDrawerOpen)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent showBreadcrumb={!isRootPage}>
      <PageHead title={messages.metaTitle} description={messages.metaDescription} />
      <KeyResultSingleDrawer />

      <Box pb={8}>
        <MyKeyResultsPageSwitcher />
      </Box>

      <KeyResultsActiveAndOwnedByUser onLineClick={handleLineClick} />
    </PageContent>
  )
}

export default MyKeyResultsActiveCyclesPage
