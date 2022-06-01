import { useQuery } from '@apollo/client'
import {
  Button,
  Flex,
  Box,
  Text,
  HStack,
  Heading,
  Drawer,
  DrawerContent,
  DrawerBody,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { PageMetaHead } from 'src/components/Base'
import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'
import PageContent from 'src/components/Base/PageContent'
import { PageHeader } from 'src/components/Base/PageHeader/wrapper'
import HistoryIcon from 'src/components/Icon/History'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import { TeamSectionWrapper } from 'src/components/Page/Team/Section/wrapper'
import { UserObjectives } from 'src/components/User/Objectives/wrapper'
import { UserProfile } from 'src/components/User/Profile/wrapper'
import { SelectUserfromList } from 'src/components/User/SelectFromList'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import {
  ObjectivesViewMode,
  userObjectivesViewMode,
} from 'src/state/recoil/user/objectives-view-mode'

import messages from './messages'
import queries from './queries.gql'

interface IndividualOkrPageProperties {
  intl: ReturnType<typeof useIntl>
  userData: User
}

const IndividualOkrPage = ({ intl, userData }: IndividualOkrPageProperties) => {
  const { data } = useQuery(queries.LIST_USERS_WITH_INDIVIDUAL_OKR)
  const [selectedUserID, setSelectedUserID] = useState<string>()
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)
  const [users, setUsers] = useConnectionEdges<User>(data?.users?.edges)
  const [viewMode, setViewMode] = useRecoilState(userObjectivesViewMode(userData.id))
  const { dispatch } = useEvent(EventType.PAGE_VIEW)

  const viewModeOptions = new Map([
    [
      ObjectivesViewMode.ACTIVE,
      {
        label: intl.formatMessage(messages.historyButtonTitle),
        action: () => setViewMode(ObjectivesViewMode.NOT_ACTIVE),
      },
    ],
    [
      ObjectivesViewMode.NOT_ACTIVE,
      {
        label: intl.formatMessage(messages.backToThePresentButtonTitle),
        action: () => setViewMode(ObjectivesViewMode.ACTIVE),
      },
    ],
  ])

  const viewModeConfig = viewModeOptions.get(viewMode)

  const handleClose = () => {
    if (isUserSidebarOpen) setIsUserSidebarOpen(false)
  }

  useEffect(() => {
    setIsUserSidebarOpen(Boolean(selectedUserID))
  }, [selectedUserID, setIsUserSidebarOpen])

  useEffect(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    if (!isUserSidebarOpen) setSelectedUserID(undefined)
  }, [isUserSidebarOpen, setSelectedUserID])

  const handleUserDeactivation = async () => {
    handleClose()
  }

  const handleSelect = (userID: string) => {
    if (userID !== selectedUserID) setSelectedUserID(userID)
  }

  useEffect(() => {
    if (data) {
      const filteredData = data.users.edges.filter((edge: any) => edge.node.id !== userData?.id)
      setUsers(filteredData)
    }
  }, [data, setUsers, userData])

  useEffect(() => {
    dispatch({ pathname: '/profile#individual-plan' })
  }, [dispatch])

  return (
    <PageContent background="new-gray.50">
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />
      <KeyResultSingleDrawer />

      <PageHeader>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Heading color="new-gray.800" mt={1}>
              {intl.formatMessage(messages.individualOKRTitle)}
            </Heading>
            <Text color="new-gray.600" fontWeight={500} mt={3}>
              {intl.formatMessage(messages.individualOKRSubTitle, { username: userData.firstName })}
            </Text>
          </Box>

          <Flex>
            <Button
              marginRight="8px"
              background="#E8EEFC"
              leftIcon={
                <HistoryIcon
                  fill="currentcolor"
                  desc={intl.formatMessage(messages.historyIconDescription)}
                />
              }
              onClick={viewModeConfig?.action}
            >
              {viewModeConfig?.label}
            </Button>
          </Flex>
        </Flex>
      </PageHeader>

      <HStack align="stretch" spacing={8} flex="1" w="100%">
        <Box flexGrow={1}>
          {userData ? <UserObjectives userID={userData.id} viewType={viewMode} /> : undefined}
        </Box>
        <Box w="md" minW="md">
          <TeamSectionWrapper
            title={intl.formatMessage(messages.individualOkrsCompanyMembersTitle)}
          >
            <SelectUserfromList
              hasMenu
              users={users}
              avatarSubtitleType="role"
              onSelect={handleSelect}
            />
            <Drawer isOpen={isUserSidebarOpen} size="xl" onClose={handleClose}>
              <ColorizedOverlay>
                <DrawerContent>
                  <DrawerBody>
                    {selectedUserID && (
                      <UserProfile
                        userID={selectedUserID}
                        onUserDeactivation={handleUserDeactivation}
                      />
                    )}
                  </DrawerBody>
                </DrawerContent>
              </ColorizedOverlay>
            </Drawer>
          </TeamSectionWrapper>
        </Box>
      </HStack>
    </PageContent>
  )
}

export default IndividualOkrPage
