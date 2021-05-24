import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import MyKeyResultsPageSwitcher from 'src/components/Page/MyKeyResults/Switcher'
import MyKeyResultsPageSwitcherSkeleton from 'src/components/Page/MyKeyResults/Switcher/skeleton'
import { keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'

import { PageHeader } from '../../../Base/PageHeader/wrapper'

import messages from './messages'
import queries from './queries.gql'

const MyKeyResultsActiveCyclesPage = () => {
  const intl = useIntl()
  const setOpenDrawer = useSetRecoilState(keyResultDrawerOpen)
  const { data, loading } = useQuery(queries.LIST_NOT_ACTIVE_CYCLES)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)
  const hasInactiveCycles = data?.cycles?.edges.length > 0

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />
      <KeyResultSingleDrawer />

      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
      </PageHeader>

      <Box pb={8}>
        {loading ? (
          <MyKeyResultsPageSwitcherSkeleton />
        ) : (
          Boolean(hasInactiveCycles) && <MyKeyResultsPageSwitcher />
        )}
      </Box>

      <KeyResultsActiveAndOwnedByUser onLineClick={handleLineClick} />
    </PageContent>
  )
}

export default MyKeyResultsActiveCyclesPage
