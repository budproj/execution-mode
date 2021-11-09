import React from 'react'
import { useIntl } from 'react-intl'

import { SearchableList } from 'src/components/Base/SearchableList'
import { User } from 'src/components/User/types'

import { NamedAvatarSubtitleType } from '../NamedAvatar/types'

import messages from './messages'
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
}: SelectUserFromListProperties) => {
  const intl = useIntl()

  return (
    <SearchableList
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      searchKey="fullName"
      initialItems={users}
    >
      <UsersInContext
        hasUserCard={showUserCard}
        isLoading={isLoading}
        avatarSubtitleType={avatarSubtitleType}
        onSelect={onSelect}
      />
    </SearchableList>
  )
}
