import { useLazyQuery, useMutation } from '@apollo/client'
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
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'
import PageContent from 'src/components/Base/PageContent'
import { PageHeader } from 'src/components/Base/PageHeader/wrapper'
import { ActionMenu } from 'src/components/Cycle/ActionMenu/wrapper'
import HistoryIcon from 'src/components/Icon/History'
import objectiveMessages from 'src/components/Objective/OKRsEmptyState/messages'
import { CreateDraftObjectiveQueryResult } from 'src/components/Objective/OKRsEmptyState/wrapper'
import objectiveQueries from 'src/components/Objective/queries.gql'
import { TeamSectionWrapper } from 'src/components/Page/Team/Section/wrapper'
import { UserObjectives } from 'src/components/User/Objectives/wrapper'
import { UserProfile } from 'src/components/User/Profile/wrapper'
import { SelectUserfromList } from 'src/components/User/SelectFromList'
import { useGetUserAuthzRole } from 'src/components/User/hooks/getUserAuthzRole/get-user-authz-role'
import { useGetUserObjectives } from 'src/components/User/hooks/getUserObjectives'
import { User } from 'src/components/User/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import useLocalStorage from 'src/state/hooks/useLocalStorage/hook'
import { AUTHZ_ROLES } from 'src/state/recoil/authz/constants'
import { ObjectiveViewMode, setObjectiveToMode } from 'src/state/recoil/objective/context'
import { userActiveObjectives } from 'src/state/recoil/user/active-objectives'
import meAtom from 'src/state/recoil/user/me'
import {
  ObjectivesViewMode,
  userObjectivesViewMode,
} from 'src/state/recoil/user/objectives-view-mode'

import { workflowControlStorageKey } from '../Accordion/Item/Button/edit-mode'

import { useGetUsersWithIndividualPlan } from './hooks/get-users-with-individual-plan'
import messages from './messages'
import queries from './queries.gql'

interface IndividualOkrPageProperties {
  intl: ReturnType<typeof useIntl>
  userID: string
}

type GetUserAccessToCreateObjectivesResult = {
  me: User
}

export const IndividualOkrPage = ({ intl, userID }: IndividualOkrPageProperties) => {
  const { data, loading } = useGetUsersWithIndividualPlan()
  const myID = useRecoilValue(meAtom)
  const { data: userAuthzRole, loading: loadingAuthzRole } = useGetUserAuthzRole(myID)

  const hasUserPermissionToSeeUsersWithIndividualPlan =
    [AUTHZ_ROLES.ADMIN, AUTHZ_ROLES.LEADER].includes(userAuthzRole?.name as AUTHZ_ROLES) &&
    !loadingAuthzRole

  const [usersList, setUsersList] = useState<User[]>(data)
  const { get, register } = useLocalStorage()

  const [selectedUserID, setSelectedUserID] = useState<string>()
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)
  const [canCreateObjectives, setCanCreateObjectives] = useState(false)
  const [viewMode, setViewMode] = useRecoilState(userObjectivesViewMode(userID))
  const setActiveObjectives = useSetRecoilState(userActiveObjectives(userID))
  const setObjectiveIDToEditMode = useSetRecoilState(setObjectiveToMode(ObjectiveViewMode.EDIT))
  const { refetch } = useGetUserObjectives(
    { ownerId: userID },
    { setObjetives: setActiveObjectives },
  )

  const router = useRouter()
  const toast = useToast()
  const { dispatch: dispatchPageView } = useEvent(EventType.PAGE_VIEW)
  const { dispatch: dispatchCreatedObjective } = useEvent(EventType.CREATED_OBJECTIVE)

  const viewModeOptions = new Map([
    [
      ObjectivesViewMode.ACTIVE,
      {
        isObjectiveCreationPossible: true,
        label: intl.formatMessage(messages.historyButtonTitle),
        action: () => setViewMode(ObjectivesViewMode.NOT_ACTIVE),
      },
    ],
    [
      ObjectivesViewMode.NOT_ACTIVE,
      {
        isObjectiveCreationPossible: false,
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
      const filteredData = data.filter(({ id, status }) => id !== userID && status === 'ACTIVE')
      console.log(filteredData)
      setUsersList(filteredData)
    }
  }, [data, setUsersList, userID])

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
        dispatchCreatedObjective({ isPersonal: true, userId: userID })
        await refetch({
          ownerId: userID,
          active: viewMode === ObjectivesViewMode.ACTIVE,
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

  const [fetchActiveCycles] = useLazyQuery<GetUserAccessToCreateObjectivesResult>(
    queries.GET_USER_ACCESS_TO_CREATE_OBJECTIVES,
    {
      onCompleted: ({ me }) => {
        const isSameUser = userID === me.id

        setCanCreateObjectives(isSameUser)
      },
    },
  )

  const handleDraftObjectiveCreation = (cycleID?: string) => {
    const valueStoraged = get(workflowControlStorageKey)
    void createDraftObjective({
      variables: {
        cycleID,
      },
    })

    if (valueStoraged) {
      register(workflowControlStorageKey, false)
    }
  }

  useEffect(() => {
    const { pathname } = router
    const [_, path] = pathname.split('/')

    dispatchPageView({ pathname: `/${path}#individual-plan` })
    fetchActiveCycles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageContent background="new-gray.50">
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

            {viewModeConfig?.isObjectiveCreationPossible && canCreateObjectives && (
              <ActionMenu onCreateOKR={handleDraftObjectiveCreation}>
                <Button background="brand.500" color="white">
                  {intl.formatMessage(messages.createObjectiveButtonTitle)}
                </Button>
              </ActionMenu>
            )}
          </Flex>
        </Flex>
      </PageHeader>

      <HStack align="stretch" spacing={8} flex="1" w="100%">
        <Box flexGrow={1}>
          {userID ? <UserObjectives userID={userID} viewType={viewMode} /> : undefined}
        </Box>
        <Box
          w="md"
          minW="md"
          display={hasUserPermissionToSeeUsersWithIndividualPlan ? 'default' : 'none'}
        >
          <TeamSectionWrapper
            title={intl.formatMessage(messages.individualOkrsCompanyMembersTitle, {
              isLoaded: !loading,
              totalMembersCount: usersList.length,
            })}
          >
            <SelectUserfromList
              hasMenu
              users={usersList}
              isLoading={loading}
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
