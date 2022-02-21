import { useQuery } from '@apollo/client'
import { Box, Divider, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import PageSwitcher from 'src/components/Page/MyThings/Switcher'
import PageSwitcherSkeleton from 'src/components/Page/MyThings/Switcher/skeleton'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { PageHeader } from '../../../Base/PageHeader/wrapper'

import messages from './messages'
import queries from './queries.gql'

const ActiveCyclesPage = () => {
  const intl = useIntl()
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)
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
        {loading ? <PageSwitcherSkeleton /> : Boolean(hasInactiveCycles) && <PageSwitcher />}
      </Box>

      <HStack align="stretch" justify="stretch" spacing="4rem">
        <KeyResultsActiveAndOwnedByUser onLineClick={handleLineClick} />

        <Box>
          <Divider orientation="vertical" h="full" />
        </Box>
        <Text color="gray.500" backgroundColor="black">
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
          industries for previewing layouts and visual mockups.
        </Text>
      </HStack>
    </PageContent>
  )
}

export default ActiveCyclesPage
