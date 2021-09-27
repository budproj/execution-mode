import { Stack } from '@chakra-ui/react'
import React from 'react'

import { User } from 'src/components/User/types'

import { Search } from '../../Base/Search/wrapper'
import { UserList } from '../List/wrapper'
import { NamedAvatarSubtitleType } from '../NamedAvatar/types'

export interface SelectUserFromListProperties {
  users: User[]
  isLoading?: boolean
  onSelect?: (userID: string) => void | Promise<void>
  onSearch?: (query: string) => void
  avatarSubtitleType?: NamedAvatarSubtitleType
  showUserCard?: boolean
}

export const SelectUserFromList = ({
  users,
  isLoading,
  onSelect,
  onSearch,
  showUserCard,
  avatarSubtitleType,
}: SelectUserFromListProperties) => (
  <Stack spacing={4} maxH="full">
    <Search onSearch={onSearch} />
    <UserList
      showUserCard={showUserCard}
      users={users}
      isLoading={isLoading}
      avatarSubtitleType={avatarSubtitleType}
      onUserClick={onSelect}
    />
  </Stack>
)
