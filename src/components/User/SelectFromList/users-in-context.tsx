import React, { useContext } from 'react'

import { SearchableListContext } from 'src/components/Base/SearchableList/context'

import { UserList } from '../List/wrapper'
import { NamedAvatarSubtitleType } from '../NamedAvatar/types'

type UsersInContextProperties = {
  avatarSubtitleType?: NamedAvatarSubtitleType
  isLoading?: boolean
  hasUserCard?: boolean
  onSelect?: (userID: string) => void | Promise<void>
}

export const UsersInContext = ({
  avatarSubtitleType,
  isLoading,
  hasUserCard,
  onSelect,
}: UsersInContextProperties) => {
  const { items } = useContext(SearchableListContext)

  return (
    <UserList
      users={items}
      showUserCard={hasUserCard}
      isLoading={isLoading}
      avatarSubtitleType={avatarSubtitleType}
      onUserClick={onSelect}
    />
  )
}
