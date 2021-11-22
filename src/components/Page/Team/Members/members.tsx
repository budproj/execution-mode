import { useLazyQuery } from '@apollo/client'
import { Drawer, DrawerBody, DrawerContent } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'
import { UserProfile } from 'src/components/User/Profile/wrapper'
import { SelectUserfromList } from 'src/components/User/SelectFromList'
import { User } from 'src/components/User/types'
import { GraphQLConnection } from 'src/components/types'
import { selectTeam } from 'src/state/recoil/team/selector'

import { TeamSectionWrapper } from '../Section/wrapper'

import messages from './messages'
import queries from './queries.gql'

type TeamMembersProperties = {
  teamID?: string
  isLoaded?: boolean
  members: User[]
  hasAddMembersPermission?: boolean
}

type GetTeamMembersResponse = {
  team: {
    users: GraphQLConnection<User>
  }
}

export const TeamMembers = ({
  teamID,
  isLoaded,
  members,
  hasAddMembersPermission,
}: TeamMembersProperties) => {
  const intl = useIntl()
  const [selectedUserID, setSelectedUserID] = useState<string>()
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)
  const [numberOfCreatedMembers, setNumberOfCreatedMembers] = useState(0)
  const updateTeam = useSetRecoilState(selectTeam(teamID))

  const [refreshTeamMembers] = useLazyQuery<GetTeamMembersResponse>(queries.GET_TEAM_MEMBERS, {
    fetchPolicy: 'network-only',
    variables: {
      teamID,
    },
    onCompleted: (data) => {
      updateTeam(data.team)
    },
  })

  const handleSelect = (userID: string) => {
    if (userID !== selectedUserID) setSelectedUserID(userID)
  }

  const handleClose = () => {
    if (isUserSidebarOpen) setIsUserSidebarOpen(false)
  }

  const handleUserDeactivation = async () => {
    void refreshTeamMembers()
    handleClose()
  }

  const handleCreatedUser = () => {
    setNumberOfCreatedMembers(numberOfCreatedMembers + 1)
  }

  useEffect(() => {
    setIsUserSidebarOpen(Boolean(selectedUserID))
  }, [selectedUserID, setIsUserSidebarOpen])

  useEffect(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    if (!isUserSidebarOpen) setSelectedUserID(undefined)
  }, [isUserSidebarOpen, setSelectedUserID])

  return (
    <TeamSectionWrapper
      title={intl.formatMessage(messages.title, {
        isLoaded,
        totalMembersCount: members.length + numberOfCreatedMembers,
      })}
    >
      <SelectUserfromList
        showUserCard
        teamID={teamID}
        users={members}
        avatarSubtitleType="role"
        isLoading={!isLoaded}
        hasCreateNewUserPermission={hasAddMembersPermission}
        emptyStateTitle={messages.emptyStateTitle}
        onSelect={handleSelect}
        onCreateUser={handleCreatedUser}
      />
      <Drawer isOpen={isUserSidebarOpen} size="xl" onClose={handleClose}>
        <ColorizedOverlay>
          <DrawerContent>
            <DrawerBody>
              {selectedUserID && (
                <UserProfile userID={selectedUserID} onUserDeactivation={handleUserDeactivation} />
              )}
            </DrawerBody>
          </DrawerContent>
        </ColorizedOverlay>
      </Drawer>
    </TeamSectionWrapper>
  )
}
