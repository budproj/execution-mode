import { Box, Divider, HStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { PageHeader } from '../../../Base/PageHeader/wrapper'

import messages from './messages'
import MyTasks from './my-tasks'

const ActiveCyclesPage = () => {
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

      <HStack align="stretch" spacing="4rem" flex="1">
        <Box flexBasis="60%">
          <KeyResultsActiveAndOwnedByUser onLineClick={handleLineClick} />
        </Box>

        <Box>
          <Divider orientation="vertical" h="full" />
        </Box>

        <Box flex="1">
          <MyTasks />
        </Box>
      </HStack>
    </PageContent>
  )
}

export default ActiveCyclesPage
