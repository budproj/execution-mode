import React from 'react'

import { SearchableList } from 'src/components/Base/SearchableList'
import { SearchableListBody } from 'src/components/Base/SearchableList/body'
import { SearchableListSearchBar } from 'src/components/Base/SearchableList/search-bar'
import { User } from 'src/components/User/types'

import { NamedAvatarSubtitleType } from '../NamedAvatar/types'

import { UsersInContext } from './users-in-context'

export interface SelectUserFromListProperties {
  users: User[]
  isLoading?: boolean
  onSelect?: (userID: string) => void | Promise<void>
  onSearch?: (query: string) => void
  avatarSubtitleType?: NamedAvatarSubtitleType
  showUserCard?: boolean
}

export const SelectUserFromListWrapper = ({
  users,
  isLoading,
  onSelect,
  showUserCard,
  avatarSubtitleType,
}: SelectUserFromListProperties) => (
  <SearchableList searchKey="fullName" initialItems={users}>
    <SearchableListBody>
      <SearchableListSearchBar />
      <UsersInContext
        hasUserCard={showUserCard}
        isLoading={isLoading}
        avatarSubtitleType={avatarSubtitleType}
        onSelect={onSelect}
      />
    </SearchableListBody>
  </SearchableList>
)
