import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  HStack,
  Heading,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import { Scrollbars } from 'rc-scrollbars'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'

import { PageMetaHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { ChevronDown } from 'src/components/Icon'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import { TASK_STATUS } from 'src/components/Task/constants'
import { DetailedHeader } from 'src/components/User/DetailedHeader'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { myThingsTasksQuery } from 'src/state/recoil/task'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import { PageHeader } from '../../../Base/PageHeader/wrapper'

import messages from './messages'
import MyPersonalTasks from './my-personal-tasks'
import MyTasks from './my-tasks'

const ActiveCyclesPage = () => {
  const intl = useIntl()
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const setTasksQuery = useSetRecoilState(myThingsTasksQuery)
  const userID = useRecoilValue(meAtom)
  const [user] = useRecoilState(selectUser(userID))

  const statesLabels = new Map([
    [TASK_STATUS.UNCHECKED, intl.formatMessage(messages.pendingTasks)],
    [TASK_STATUS.CHECKED, intl.formatMessage(messages.allTasks)],
  ])

  const [taskState, setTaskState] = useState(TASK_STATUS.CHECKED)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  const handleTaskFilterChange = (taskState: TASK_STATUS) => {
    setTaskState(taskState)
    setTasksQuery((previousQuery) => ({
      ...previousQuery,
      onlyUnchecked: taskState === TASK_STATUS.UNCHECKED,
    }))
  }

  return (
    <>
      <DetailedHeader userData={user} isUserLoading={false} />
      <PageContent>
        <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />
        <KeyResultSingleDrawer />

        <PageHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Heading color="new-gray.800" mt={1}>
                {intl.formatMessage(messages.pageTitle)}
              </Heading>
              <Text color="new-gray.600" fontWeight={500} mt={3}>
                {intl.formatMessage(messages.pageSubTitle)}
              </Text>
            </Box>

            <Box>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={Button}
                      borderWidth={2}
                      borderColor="new-gray.400"
                      color="new-gray.800"
                      borderRadius={4}
                      px="16px"
                      py="11px"
                      h="auto"
                      fontSize="md"
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
                    >
                      {[...statesLabels].map(([labelEnum]) => (
                        <MenuItem
                          key={labelEnum}
                          px="16px"
                          py="11px"
                          color="new-gray.800"
                          h="auto"
                          w="100%"
                          fontSize="md"
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
                  </>
                )}
              </Menu>
            </Box>
          </Flex>
        </PageHeader>

        <HStack align="stretch" spacing="4rem" flex="1">
          <Box flexBasis="60%" maxWidth="60%">
            <Scrollbars>
              <KeyResultsActiveAndOwnedByUser userID={userID} onLineClick={handleLineClick} />
            </Scrollbars>
          </Box>

          <Box>
            <Divider orientation="vertical" h="full" borderColor="new-gray.400" opacity="1" />
          </Box>

          <Box flex="1">
            <Scrollbars>
              <Box pr={6}>
                <MyPersonalTasks />
                <MyTasks userID={userID} />
              </Box>
            </Scrollbars>
          </Box>
        </HStack>
      </PageContent>
    </>
  )
}

export default ActiveCyclesPage
