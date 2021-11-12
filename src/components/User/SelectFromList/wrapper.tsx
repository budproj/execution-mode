import React, { useState } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import { SearchableList } from 'src/components/Base/SearchableList'
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
  avatarSubtitleType?: NamedAvatarSubtitleType
  showUserCard?: boolean
  emptyStateTitle?: MessageDescriptor
}

export const SelectUserFromListWrapper = ({
  teamID,
  users,
  isLoading,
  onSelect,
  showUserCard,
  avatarSubtitleType,
  hasCreateNewUserPermission,
  emptyStateTitle,
}: SelectUserFromListProperties) => {
  const [isCreateSidebarOpen, setIsCreateSidebarOpen] = useState(false)
  const intl = useIntl()

  const handleCreateSidebarOpen = () => {
    if (!isCreateSidebarOpen) setIsCreateSidebarOpen(true)
  }

  const handleCreateSidebarClose = () => {
    if (isCreateSidebarOpen) setIsCreateSidebarOpen(false)
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
        onCreateStart={handleCreateSidebarOpen}
        onSelect={onSelect}
      />

      <CreateSidebarInContext
        teamID={teamID}
        isOpen={isCreateSidebarOpen}
        onClose={handleCreateSidebarClose}
        onSelect={onSelect}
      />
    </SearchableList>
  )
}
