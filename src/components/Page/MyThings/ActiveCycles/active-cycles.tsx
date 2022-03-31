import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Tag,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import { Scrollbars } from 'rc-scrollbars'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { ChevronDown } from 'src/components/Icon'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import { TASK_STATUS } from 'src/components/Task/constants'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { PageHeader } from '../../../Base/PageHeader/wrapper'

import messages from './messages'
import MyPersonalTasks from './my-personal-tasks'
import MyTasks from './my-tasks'

const ActiveCyclesPage = () => {
  const intl = useIntl()
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const statesLabels = new Map([
    [TASK_STATUS.UNCHECKED, intl.formatMessage(messages.pendingTasks)],
    [TASK_STATUS.CHECKED, intl.formatMessage(messages.allTasks)],
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [taskState, setTaskState] = useState(TASK_STATUS.UNCHECKED)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  const handleTaskFilterChange = (taskState: TASK_STATUS) => {
    setTaskState(taskState)
  }

  const toggleOpen = () => setIsOpen(!isOpen)

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
          <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between">
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

            <Menu onOpen={toggleOpen} onClose={toggleOpen}>
              <MenuButton
                as={Button}
                borderWidth={1}
                borderColor="new-gray.600"
                color="new-gray.600"
                borderRadius={4}
                px="0.75rem"
                py="0.35rem"
                h="auto"
                fontSize="sm"
                iconSpacing={6}
                rightIcon={
                  <ChevronDown
                    desc="menu"
                    fontSize="xs"
                    color="new-gray.200"
                    stroke="new-gray.200"
                    transition="0.2s transform ease-in"
                    transform={isOpen ? 'rotate(180deg)' : 'none'}
                  />
                }
                transition="0.2s background-color, 0.2s color"
                _hover={{
                  backgroundColor: 'gray.50',
                  color: 'new-gray.800',
                }}
              >
                {statesLabels.get(taskState)}
              </MenuButton>
              <MenuList
                boxShadow="lg"
                borderColor="new-gray.200"
                borderWidth={1}
                overflow="hidden"
                zIndex={999}
                minWidth="auto"
              >
                {[...statesLabels].map(([labelEnum]) => (
                  <MenuItem
                    key={labelEnum}
                    p="0.35rem 3rem 0.35rem 0.75rem"
                    color="new-gray.600"
                    h="auto"
                    fontSize="sm"
                    fontWeight={500}
                    transition="0.2s background-color, 0.2s color"
                    _hover={{
                      backgroundColor: 'gray.50',
                      color: 'new-gray.800',
                    }}
                    onClick={() => handleTaskFilterChange(labelEnum)}
                  >
                    {statesLabels.get(labelEnum)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>

          <Divider mt="3.3rem" mb={6} borderColor="new-gray.400" opacity="1" />

          <Scrollbars style={{ maxHeight: '85%' }}>
            <Box pr={6}>
              <MyPersonalTasks taskState={taskState} />
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
