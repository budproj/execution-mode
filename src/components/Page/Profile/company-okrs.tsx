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
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageMetaHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { PageHeader } from 'src/components/Base/PageHeader/wrapper'
import { ChevronDown } from 'src/components/Icon'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResult } from 'src/components/KeyResult/types'
import tasksMessages from 'src/components/Page/MyThings/ActiveCycles/messages'
import MyTasks from 'src/components/Page/MyThings/ActiveCycles/my-tasks'
import { OLD_TASK_STATUS } from 'src/components/Task/constants'
import { companyPreposition } from 'src/components/User/DetailedHeader/constants'
import { User } from 'src/components/User/types'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { myThingsTasksQuery } from 'src/state/recoil/task'

import messages from './messages'

interface ProfilePageProperties {
  userData: User
  isUserLoading: boolean
  intl: ReturnType<typeof useIntl>
}

const CompanyOkrPage = ({ userData, isUserLoading, intl }: ProfilePageProperties) => {
  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const setTasksQuery = useSetRecoilState(myThingsTasksQuery)

  const statesLabels = new Map([
    [OLD_TASK_STATUS.CHECKED, intl.formatMessage(tasksMessages.allTasks)],
    [OLD_TASK_STATUS.UNCHECKED, intl.formatMessage(tasksMessages.pendingTasks)],
  ])

  const [taskState, setTaskState] = useState(OLD_TASK_STATUS.CHECKED)

  const handleLineClick = (id: KeyResult['id']) => setOpenDrawer(id)

  const handleTaskFilterChange = (taskState: OLD_TASK_STATUS) => {
    setTaskState(taskState)
    setTasksQuery((previousQuery) => ({
      ...previousQuery,
      onlyUnchecked: taskState === OLD_TASK_STATUS.UNCHECKED,
    }))
  }

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader mb={6}>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Skeleton isLoaded={!isUserLoading} mt={1}>
              <Heading color="new-gray.800">
                {intl.formatMessage(messages.companyOKRTitle, {
                  company: userData?.companies?.edges[0].node.name,
                  companypreposition: companyPreposition(userData?.companies?.edges[0].node.gender),
                })}
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
          <KeyResultsActiveAndOwnedByUser
            userID={userData?.id}
            username={userData?.firstName}
            onLineClick={handleLineClick}
          />
        </Box>

        <Box>
          <Divider orientation="vertical" h="full" borderColor="new-gray.400" opacity="1" />
        </Box>

        <Box flex="1">
          <MyTasks userID={userData?.id} username={userData?.firstName} />
        </Box>
      </HStack>
    </PageContent>
  )
}

export default CompanyOkrPage
