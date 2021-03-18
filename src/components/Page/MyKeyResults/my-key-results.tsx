import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { KeyResultNotActiveAndOwnedByUser } from 'src/components/KeyResult'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import { PageProperties } from 'src/components/Page/types'
import { keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'
import { pageTitleAtom } from 'src/state/recoil/page'

import messages from './messages'

const MyKeyResultsPage = ({ isRootPage }: PageProperties) => {
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

      <Tabs isLazy>
        <TabList>
          <Tab>{intl.formatMessage(messages.firstTab)}</Tab>
          <Tab>{intl.formatMessage(messages.secondTab)}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <KeyResultsActiveAndOwnedByUser onLineClick={handleLineClick} />
          </TabPanel>

          <TabPanel>
            <KeyResultNotActiveAndOwnedByUser />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContent>
  )
}

export default MyKeyResultsPage
