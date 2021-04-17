import { useQuery } from '@apollo/client'
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
import MyKeyResultsPageSwitcherSkeleton from 'src/components/Page/MyKeyResults/Switcher/skeleton'
import { PageProperties } from 'src/components/Page/types'
import { Scope } from 'src/components/types'
import { keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'
import { pageTitleAtom } from 'src/state/recoil/page'

import messages from './messages'
import queries from './queries.gql'

const MyKeyResultsActiveCyclesPage = ({ isRootPage }: PageProperties) => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const setOpenDrawer = useSetRecoilState(keyResultDrawerOpen)
  const { data, loading } = useQuery(queries.LIST_NOT_ACTIVE_CYCLES)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)
  const hasInactiveCycles = data?.cycles?.edges.length > 0

  useEffect((): void => {
    setPageTitle(intl.formatMessage(messages.pageTitle))
  }, [intl, setPageTitle])

  return (
    <PageContent showBreadcrumb={!isRootPage}>
      <PageHead title={messages.metaTitle} description={messages.metaDescription} />
      <KeyResultSingleDrawer scope={Scope.OWNS} />

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
