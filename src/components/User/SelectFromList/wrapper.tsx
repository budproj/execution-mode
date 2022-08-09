import React, { useState } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import { SearchableList } from 'src/components/Base/SearchableList'
import { AddMemberToTeamModal } from 'src/components/Team/AddMemberToTeamModal'
import { User } from 'src/components/User/types'

import { NamedAvatarSubtitleType } from '../NamedAvatar/types'

import { SelectUserFromListContent } from './Content/wrapper'
import { CreateSidebarInContext } from './create-sidebar-in-context'
import messages from './messages'

export interface SelectUserFromListProperties {
  users: User[]
  isLoading?: boolean
  hasCreateNewUserPermission?: boolean
  teamID?: string
  onSelect?: (userID: string) => void | Promise<void>
  onSearch?: (query: string) => void
  onCreateUser?: (userID: string) => Promise<void> | void
  avatarSubtitleType?: NamedAvatarSubtitleType
  isSelectingMultiples?: boolean
  showUserCard?: boolean
  emptyStateTitle?: MessageDescriptor
  hasMenu?: boolean
  teamLeader?: User
  usersIdsBlacklist?: string[]
}

export const SelectUserFromListWrapper = ({
  teamID,
  users,
  isLoading,
  onSelect,
  onCreateUser,
  isSelectingMultiples,
  showUserCard,
  avatarSubtitleType,
  hasCreateNewUserPermission,
  emptyStateTitle,
  hasMenu,
  teamLeader,
  usersIdsBlacklist,
}: SelectUserFromListProperties) => {
  const [isCreateSidebarOpen, setIsCreateSidebarOpen] = useState(false)
  const [isAddToTeamModalOpen, setIsAddToTeamModalOpen] = useState(false)
  const intl = useIntl()

  const handleCreateSidebarOpen = () => {
    if (!isCreateSidebarOpen) setIsCreateSidebarOpen(true)
  }

  const handleCreateSidebarClose = () => {
    if (isCreateSidebarOpen) setIsCreateSidebarOpen(false)
  }

  const handleAddToTeamModalOpen = () => {
    if (!isAddToTeamModalOpen) setIsAddToTeamModalOpen(true)
  }

  const handleAddToTeamModalClose = () => {
    if (isAddToTeamModalOpen) setIsAddToTeamModalOpen(false)
  }

  const hasUsers = users.length > 0

  return (
    <SearchableList
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      searchKey="fullName"
      isLoading={isLoading}
      initialItems={users}
      isSearchBarInitiallyVisible={hasUsers}
    >
      <SelectUserFromListContent
        hasCreatePermission={hasCreateNewUserPermission}
        hasUserCard={showUserCard}
        isLoading={isLoading}
        avatarSubtitleType={avatarSubtitleType}
        emptyStateTitle={emptyStateTitle}
        hasMenu={hasMenu}
        teamLeader={teamLeader}
        usersIdsBlacklist={usersIdsBlacklist}
        isSelectingMultiples={isSelectingMultiples}
        onCreateStart={handleCreateSidebarOpen}
        onAddUserToTeam={handleAddToTeamModalOpen}
        onSelect={onSelect}
      />

      <CreateSidebarInContext
        teamID={teamID}
        isOpen={isCreateSidebarOpen}
        onClose={handleCreateSidebarClose}
        onSelect={onSelect}
        onCreate={onCreateUser}
      />

      <AddMemberToTeamModal
        isOpen={isAddToTeamModalOpen}
        teamID={teamID}
        onClose={handleAddToTeamModalClose}
      />
    </SearchableList>
  )
}
