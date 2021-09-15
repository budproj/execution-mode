import { Drawer, DrawerBody, DrawerContent } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ColorizedDrawerOverlay } from 'src/components/Base/ColorizedDrawerOverlay/wrapper'
import { SelectUserFromList } from 'src/components/User/SelectFromList/wrapper'
import { User } from 'src/components/User/types'

import { TeamSectionWrapper } from '../Section/wrapper'

import messages from './messages'

type TeamMembersProperties = {
  isLoaded?: boolean
  members: User[]
  onSearch?: (value: string) => void
}

export const TeamMembers = ({ isLoaded, members, onSearch }: TeamMembersProperties) => {
  const intl = useIntl()
  const [selectedUserID, setSelectedUserID] = useState<string>()
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)

  const handleSelect = (userID: string) => {
    if (userID !== selectedUserID) setSelectedUserID(userID)
  }

  const handleClose = () => {
    setIsUserSidebarOpen(false)
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
        <ColorizedDrawerOverlay>
          <DrawerContent>
            <DrawerBody>{selectedUserID}</DrawerBody>
          </DrawerContent>
        </ColorizedDrawerOverlay>
      </Drawer>
    </TeamSectionWrapper>
  )
}
