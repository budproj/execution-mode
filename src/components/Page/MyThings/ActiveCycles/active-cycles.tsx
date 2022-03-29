import { Box, Divider, HStack, Heading, Tag } from '@chakra-ui/react'
import { Scrollbars } from 'rc-scrollbars'
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
import MyPersonalTasks from './my-personal-tasks'
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
        <Box flexBasis="60%" maxWidth="60%">
          <Scrollbars>
            <KeyResultsActiveAndOwnedByUser onLineClick={handleLineClick} />
          </Scrollbars>
        </Box>

        <Box>
          <Divider orientation="vertical" h="full" borderColor="new-gray.400" opacity="1" />
        </Box>

        <Box flex="1">
          <Heading
            as="h2"
            fontSize="xl"
            lineHeight="1.6rem"
            textTransform="uppercase"
            fontWeight="bold"
            color="new-gray.800"
          >
            {intl.formatMessage(messages.myTasksTitle)}
            <Tag
              variant="solid"
              colorScheme="brand"
              ml={3}
              textTransform="lowercase"
              fontWeight="bold"
            >
              {intl.formatMessage(messages.newTag)}
            </Tag>
          </Heading>

          <Scrollbars>
            <Box pr={6}>
              <Divider mt={14} mb={6} borderColor="new-gray.400" opacity="1" />
              <MyPersonalTasks />
              <Divider mt={6} mb={9} borderColor="new-gray.400" opacity="1" />
              <MyTasks />
            </Box>
          </Scrollbars>
        </Box>
      </HStack>
    </PageContent>
  )
}

export default ActiveCyclesPage
