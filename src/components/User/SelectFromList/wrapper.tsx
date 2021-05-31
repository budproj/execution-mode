import { Stack } from '@chakra-ui/react'
import React from 'react'

import { User } from 'src/components/User/types'

import { UserList } from '../List/wrapper'

import { UserSearch } from './search'

export interface SelectUserFromListProperties {
  users: User[]
  isLoading?: boolean
  onSelect?: (userID: string) => Promise<void>
  onSearch?: (query: string) => void
}

export const SelectUserFromList = ({
  users,
  isLoading,
  onSelect,
  onSearch,
}: SelectUserFromListProperties) => (
  <Stack spacing={4}>
    <UserSearch onChange={onSearch} />
    <UserList users={users} isLoading={isLoading} onUserClick={onSelect} />
  </Stack>
)
