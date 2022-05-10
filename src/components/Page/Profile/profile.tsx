import {
  Box,
  Button,
  Divider,
  HStack,
  Flex,
  Heading,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Skeleton,
} from '@chakra-ui/react'
import { Scrollbars } from 'rc-scrollbars'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageMetaHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { PageHeader } from 'src/components/Base/PageHeader/wrapper'
import { ChevronDown } from 'src/components/Icon'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import tasksMessages from 'src/components/Page/MyThings/ActiveCycles/messages'
import MyTasks from 'src/components/Page/MyThings/ActiveCycles/my-tasks'
import { TASK_STATUS } from 'src/components/Task/constants'
import { DetailedHeader } from 'src/components/User/DetailedHeader'
import { useGetMyTasks } from 'src/components/User/hooks'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { myThingsTasksQuery } from 'src/state/recoil/task'

import messages from './messages'

interface ProfilePageProperties {
  userId: string
}

const ProfilePage = ({ userId }: ProfilePageProperties) => {
  const intl = useIntl()
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const setTasksQuery = useSetRecoilState(myThingsTasksQuery)
  const { data: userData, loading: isUserLoading } = useGetMyTasks(userId)

  const statesLabels = new Map([
    [TASK_STATUS.UNCHECKED, intl.formatMessage(tasksMessages.pendingTasks)],
    [TASK_STATUS.CHECKED, intl.formatMessage(tasksMessages.allTasks)],
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
      <DetailedHeader userData={userData} isUserLoading={isUserLoading} />
      <PageContent>
        <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

        <KeyResultSingleDrawer />

        <PageHeader mb={6}>
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Skeleton isLoaded={!isUserLoading} mt={1}>
                <Heading color="new-gray.800">
                  {intl.formatMessage(messages.pageTitle, { username: userData?.firstName })}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isUserLoading} mt={1}>
                <Text color="new-gray.600" fontWeight={500} mt={2}>
                  {intl.formatMessage(messages.pageSubtitle, { username: userData?.firstName })}
                </Text>
              </Skeleton>
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

        <HStack align="stretch" gap="40px" flex="1">
          <Box flexBasis="60%" maxWidth="60%">
            <Scrollbars>
              <KeyResultsActiveAndOwnedByUser
                userID={userData?.id ?? ''}
                username={userData?.firstName}
                onLineClick={handleLineClick}
              />
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
              fontWeight="bold"
              color="new-gray.800"
            >
              {intl.formatMessage(messages.taskTitle)}
            </Heading>

            <Divider mt="3.3rem" mb={6} borderColor="new-gray.400" opacity="1" />

            <Scrollbars style={{ maxHeight: '85%' }}>
              <Box pr={6}>
                <MyTasks userID={userData?.id ?? ''} username={userData?.firstName} />
              </Box>
            </Scrollbars>
          </Box>
        </HStack>
      </PageContent>
    </>
  )
}

export default ProfilePage
