import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { SearchableList } from 'src/components/Base/SearchableList'
import {
  SearchableListOption,
  SearchableListOptionGroup,
} from 'src/components/Base/SearchableList/options'
import PlusIcon from 'src/components/Icon/Plus'
import { User } from 'src/components/User/types'

import { NamedAvatarSubtitleType } from '../NamedAvatar/types'

import { CreateSidebarInContext } from './create-sidebar-in-context'
import messages from './messages'
import { UsersInContext } from './users-in-context'

export interface SelectUserFromListProperties {
  users: User[]
  isLoading?: boolean
  hasCreateNewUserPermission?: boolean
  teamID?: string
  onSelect?: (userID: string) => void | Promise<void>
  onSearch?: (query: string) => void
  avatarSubtitleType?: NamedAvatarSubtitleType
  showUserCard?: boolean
}

export const SelectUserFromListWrapper = ({
  teamID,
  users,
  isLoading,
  onSelect,
  showUserCard,
  avatarSubtitleType,
  hasCreateNewUserPermission,
}: SelectUserFromListProperties) => {
  const [isCreateSidebarOpen, setIsCreateSidebarOpen] = useState(false)
  const intl = useIntl()

  const handleCreateSidebarOpen = () => {
    if (!isCreateSidebarOpen) setIsCreateSidebarOpen(true)
  }

  const handleCreateSidebarClose = () => {
    if (isCreateSidebarOpen) setIsCreateSidebarOpen(false)
  }

  return (
    <SearchableList
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      searchKey="fullName"
      initialItems={users}
    >
      {hasCreateNewUserPermission && (
        <SearchableListOptionGroup
          id="create-users"
          icon={
            <PlusIcon
              desc={intl.formatMessage(messages.createUserOptionGroupIconDesc)}
              fill="currentColor"
            />
          }
        >
          <SearchableListOption onClick={handleCreateSidebarOpen}>
            {intl.formatMessage(messages.newUserOption)}
          </SearchableListOption>
        </SearchableListOptionGroup>
      )}

      <UsersInContext
        hasUserCard={showUserCard}
        isLoading={isLoading}
        avatarSubtitleType={avatarSubtitleType}
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
