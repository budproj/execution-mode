import { useLazyQuery } from '@apollo/client'
import { Drawer, DrawerBody, DrawerContent } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'
import { UserProfile } from 'src/components/User/Profile/wrapper'
import { SelectUserFromList } from 'src/components/User/SelectFromList/wrapper'
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
  onSearch?: (value: string) => void
}

type GetTeamMembersResponse = {
  team: {
    users: GraphQLConnection<User>
  }
}

export const TeamMembers = ({ teamID, isLoaded, members, onSearch }: TeamMembersProperties) => {
  const intl = useIntl()
  const [selectedUserID, setSelectedUserID] = useState<string>()
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)
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
        totalMembersCount: members.length,
      })}
    >
      <SelectUserFromList
        showUserCard
        users={members}
        avatarSubtitleType="role"
        isLoading={!isLoaded}
        onSearch={onSearch}
        onSelect={handleSelect}
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
