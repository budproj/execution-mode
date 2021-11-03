import React from 'react'
import { useIntl } from 'react-intl'

import { SearchableList } from 'src/components/Base/SearchableList'
import {
  SearchableListOption,
  SearchableListOptionGroup,
} from 'src/components/Base/SearchableList/options'
import PlusIcon from 'src/components/Icon/Plus'
import { User } from 'src/components/User/types'

import { NamedAvatarSubtitleType } from '../NamedAvatar/types'

import messages from './messages'
import { UsersInContext } from './users-in-context'

export interface SelectUserFromListProperties {
  users: User[]
  isLoading?: boolean
  hasCreateNewUserPermission?: boolean
  onSelect?: (userID: string) => void | Promise<void>
  onSearch?: (query: string) => void
  avatarSubtitleType?: NamedAvatarSubtitleType
  showUserCard?: boolean
}

const handleNewUser = () => {
  console.log('tag')
}

export const SelectUserFromListWrapper = ({
  users,
  isLoading,
  onSelect,
  showUserCard,
  avatarSubtitleType,
  hasCreateNewUserPermission,
}: SelectUserFromListProperties) => {
  const intl = useIntl()

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
          <SearchableListOption onClick={handleNewUser}>
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
    </SearchableList>
  )
}
