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
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { PageMetaHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { ChevronDown } from 'src/components/Icon'
import KeyResultsActiveAndOwnedByUser from 'src/components/KeyResult/ActiveAndOwnedByUser'
import { KeyResult } from 'src/components/KeyResult/types'
import { OLD_TASK_STATUS } from 'src/components/Task/constants'
import { companyPreposition } from 'src/components/User/DetailedHeader/constants'
import { myThingsTasksQuery } from 'src/state/recoil/task'
import selectUser from 'src/state/recoil/user/selector'

import { PageHeader } from '../../../Base/PageHeader/wrapper'

import messages from './messages'
import MyTasks from './my-tasks'

interface CompanyOkrPageProperties {
  intl: ReturnType<typeof useIntl>
  userID: string
  handleLineClick: (id: KeyResult['id']) => void
}

const CompanyOkrPage = ({ handleLineClick, intl, userID }: CompanyOkrPageProperties) => {
  const setTasksQuery = useSetRecoilState(myThingsTasksQuery)
  const user = useRecoilValue(selectUser(userID))

  const statesLabels = new Map([
    [OLD_TASK_STATUS.CHECKED, intl.formatMessage(messages.allTasks)],
    [OLD_TASK_STATUS.UNCHECKED, intl.formatMessage(messages.pendingTasks)],
  ])

  const [taskState, setTaskState] = useState(OLD_TASK_STATUS.CHECKED)

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

      <PageHeader>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Heading color="new-gray.800" mt={1}>
              {intl.formatMessage(messages.companyOKRTitle, {
                company: user?.companies?.edges[0].node.name,
                companypreposition: companyPreposition(user?.companies?.edges[0].node.gender),
              })}
            </Heading>
            <Text color="new-gray.600" fontWeight={500} mt={3}>
              {intl.formatMessage(messages.companyOKRSubTitle)}
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

      <HStack align="stretch" spacing="4rem" flex="1" w="100%">
        <Box flexBasis="60%" maxWidth="60%">
          {userID ? (
            <KeyResultsActiveAndOwnedByUser userID={userID} onLineClick={handleLineClick} />
          ) : undefined}
        </Box>

        <Box>
          <Divider orientation="vertical" h="full" borderColor="new-gray.400" opacity="1" />
        </Box>
        <Box flex="1">{userID ? <MyTasks userID={userID} /> : undefined}</Box>
      </HStack>
    </PageContent>
  )
}

export default CompanyOkrPage
