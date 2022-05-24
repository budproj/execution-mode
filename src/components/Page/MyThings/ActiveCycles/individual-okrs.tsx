import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Flex,
  Box,
  Divider,
  Text,
  HStack,
  Heading,
  Drawer,
  DrawerContent,
  DrawerBody,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { PageMetaHead } from 'src/components/Base'
import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'
import PageContent from 'src/components/Base/PageContent'
import { ActionMenu } from 'src/components/Cycle/ActionMenu/wrapper'
import HistoryIcon from 'src/components/Icon/History'
import { KeyResultSingleDrawer } from 'src/components/KeyResult/Single'
import objectiveMessages from 'src/components/Objective/OKRsEmptyState/messages'
import objectiveQueries from 'src/components/Objective/OKRsEmptyState/queries.gql'
import { CreateDraftObjectiveQueryResult } from 'src/components/Objective/OKRsEmptyState/wrapper'
import { UserObjectives } from 'src/components/User/Objectives/wrapper'
import { UserProfile } from 'src/components/User/Profile/wrapper'
import { SelectUserfromList } from 'src/components/User/SelectFromList'
import { useGetUserObjectives } from 'src/components/User/hooks/getUserObjectives'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { ObjectiveMode, setObjectiveToMode } from 'src/state/recoil/objective/context'
import { userActiveObjectives } from 'src/state/recoil/user/active-objectives'
import {
  ObjectivesViewMode,
  userObjectivesViewMode,
} from 'src/state/recoil/user/objectives-view-mode'

import { PageHeader } from '../../../Base/PageHeader/wrapper'
import { TeamSectionWrapper } from '../../Team/Section/wrapper'

import messages from './messages'
import queries from './queries.gql'

interface IndividualOkrPageProperties {
  intl: ReturnType<typeof useIntl>
  userID: string
}

const IndividualOkrPage = ({ intl, userID }: IndividualOkrPageProperties) => {
  const { data } = useQuery(queries.LIST_USERS_WITH_INDIVIDUAL_OKR)
  const [selectedUserID, setSelectedUserID] = useState<string>()
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)
  const [users, setUsers] = useConnectionEdges<User>(data?.users?.edges)
  const [viewMode, setViewMode] = useRecoilState(userObjectivesViewMode(userID))
  const setActiveObjectives = useSetRecoilState(userActiveObjectives(userID))
  const setObjectiveIDToEditMode = useSetRecoilState(setObjectiveToMode(ObjectiveMode.EDIT))
  const { refetch } = useGetUserObjectives(
    { ownerId: userID },
    { setObjetives: setActiveObjectives },
  )

  const toast = useToast()

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
      const filteredData = data.users.edges.filter((edge: any) => edge.node.id !== userID)
      setUsers(filteredData)
    }
  }, [data, setUsers, userID])

  const [createDraftObjective] = useMutation<CreateDraftObjectiveQueryResult>(
    objectiveQueries.CREATE_DRAFT_OBJECTIVE,
    {
      variables: {
        title: intl.formatMessage(objectiveMessages.draftObjectiveTitle),
        ownerID: userID,
        // eslint-disable-next-line unicorn/no-null
        teamID: null,
      },
      onCompleted: async (data) => {
        toast({
          title: intl.formatMessage(objectiveMessages.draftObjectiveSuccessToastMessage),
          status: 'success',
        })

        setObjectiveIDToEditMode(data.createObjective.id)
      },
      onError: () => {
        toast({
          title: intl.formatMessage(objectiveMessages.draftObjectiveErrorToastMessage),
          status: 'error',
        })
      },
    },
  )

  const handleDraftObjectiveCreation = (cycleID?: string) => {
    void createDraftObjective({
      variables: {
        cycleID,
      },
    })

    void refetch({
      ownerId: userID,
      active: viewMode === ObjectivesViewMode.ACTIVE,
    })
  }

  return (
    <PageContent background="new-gray.50">
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />
      <KeyResultSingleDrawer />

      <PageHeader>
        <Flex
          alignItems={['flex-start', 'flex-start', 'flex-start', 'center']}
          justifyContent={['flex-start', 'flex-start', 'flex-start', 'space-between']}
          direction={['column', 'column', 'column', 'row']}
          gap={6}
        >
          <Box>
            <Heading color="new-gray.800" mt={1}>
              {intl.formatMessage(messages.individualOKRTitle)}
            </Heading>
            <Text color="new-gray.600" fontWeight={500} mt={3}>
              {intl.formatMessage(messages.individualOKRSubTitle)}
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

            <ActionMenu onCreateOKR={handleDraftObjectiveCreation}>
              <Button background="brand.500" color="white">
                {intl.formatMessage(messages.createObjectiveButtonTitle)}
              </Button>
            </ActionMenu>
          </Flex>
        </Flex>
      </PageHeader>

      <HStack align="stretch" spacing="4rem" flex="1" w="100%">
        <Box flexBasis="60%" maxWidth="60%">
          {userID ? <UserObjectives userID={userID} viewType={viewMode} /> : undefined}
        </Box>

        <Box>
          <Divider orientation="vertical" h="full" borderColor="new-gray.400" opacity="1" />
        </Box>

        <TeamSectionWrapper
          minWidth="367px"
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
      </HStack>
    </PageContent>
  )
}

export default IndividualOkrPage
