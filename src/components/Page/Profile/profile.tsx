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
import { RadioProgress } from 'src/components/Base/RadioProgress/wrapper'
import { ChevronDown } from 'src/components/Icon'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { KeyResult } from 'src/components/KeyResult/types'
import tasksMessages from 'src/components/Page/MyThings/ActiveCycles/messages'
import MyTasks from 'src/components/Page/MyThings/ActiveCycles/my-tasks'
import { TASK_STATUS } from 'src/components/Task/constants'
import TeamTag from 'src/components/Team/Tag'
import { UserEditableAvatar } from 'src/components/User/EditableAvatar/wrapper'
import { useGetMyTasks } from 'src/components/User/hooks'
import { GraphQLEffect } from 'src/components/types'
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
      <PageContent
        borderBottom="1px solid"
        borderColor="new-gray.400"
        flex="unset"
        boxShadow="0px 6px 15px 0px rgb(217 226 246 / 35%)"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="flex-start" gap="20px">
            <Skeleton isLoaded={!isUserLoading}>
              <UserEditableAvatar
                size="xl"
                isDisabled={userData?.policy?.update === GraphQLEffect.ALLOW}
                userID={userData?.id}
                name={userData?.fullName}
                picture={userData?.picture}
              />
            </Skeleton>

            <Flex direction="column" justifyContent="space-between">
              <Skeleton isLoaded={!isUserLoading} width="300px" height="25px" mb="0.4rem">
                <Heading as="h2" fontWeight={500} fontSize="1.5rem">
                  {userData?.fullName}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isUserLoading} width="100px" height="21px" mb="0.7rem">
                <Heading as="h3" color="gray.400" fontWeight={400} fontSize="1.23rem">
                  {userData?.role}
                </Heading>
              </Skeleton>

              {userData?.teams && (
                <Box>
                  {userData.teams?.edges
                    .map((edge) => edge.node)
                    .map((team) => (
                      <TeamTag key={team.id} mr={2} isLoading={isUserLoading}>
                        {team.name}
                      </TeamTag>
                    ))}
                </Box>
              )}
            </Flex>
          </Flex>

          <Flex>
            <Flex direction="column">
              <RadioProgress
                isIndeterminate={isUserLoading}
                size="64px"
                progress={userData?.yearlyProgress}
                color="brand.500"
                trackColor="brand.100"
              />
              <Skeleton isLoaded={!isUserLoading} width="64px" mt={1}>
                <Text
                  color="new-gray.700"
                  fontWeight={700}
                  maxWidth="64px"
                  textAlign="center"
                  fontSize="0.85rem"
                >
                  {intl.formatMessage(messages.yearlyProgress)}
                </Text>
              </Skeleton>
            </Flex>

            <Flex direction="column" ml="35px">
              <RadioProgress
                isIndeterminate={isUserLoading}
                size="64px"
                progress={userData?.quarterlyProgress}
                color="brand.500"
                trackColor="brand.100"
              />
              <Skeleton isLoaded={!isUserLoading} width="64px" mt={1}>
                <Text
                  color="new-gray.700"
                  fontWeight={700}
                  maxWidth="64px"
                  textAlign="center"
                  fontSize="0.85rem"
                >
                  {intl.formatMessage(messages.quarterlyProgress)}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
        </Flex>
      </PageContent>
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
              <KeyResultsActiveAndOwnedByUser user={userData} onLineClick={handleLineClick} />
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
                <MyTasks username={userData?.firstName} />
              </Box>
            </Scrollbars>
          </Box>
        </HStack>
      </PageContent>
    </>
  )
}

export default ProfilePage
