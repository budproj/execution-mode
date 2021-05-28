import { Box } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { KeyResultNotActiveAndOwnedByUser } from 'src/components/KeyResult'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { PageHeader } from '../../../Base/PageHeader/wrapper'
import MyKeyResultsPageSwitcher from '../Switcher'

import messages from './messages'

const MyKeyResultsPreviousCyclesPage = () => {
  const intl = useIntl()
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />
      <KeyResultSingleDrawer />

      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
      </PageHeader>

      <Box pb={8}>
        <MyKeyResultsPageSwitcher />
      </Box>

      <KeyResultNotActiveAndOwnedByUser onLineClick={handleLineClick} />
    </PageContent>
  )
}

export default MyKeyResultsPreviousCyclesPage
