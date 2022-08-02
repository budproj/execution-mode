import { Box, Checkbox, Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useRecoilState } from 'recoil'

import { selectedUsersCheckbox } from 'src/state/recoil/user/selected-users-checkbox'

import NamedAvatar from '../NamedAvatar'
import { User } from '../types'

import { UserListProperties } from './wrapper'

interface SelectMultipleUsersProperties extends UserListProperties {
  onSelectUser: (userId: User['id']) => void | Promise<void>
}

const CheckboxStyled = styled(Checkbox)`
  .css-1yrqt7o {
    border-radius: 50px;
  }
`

export const SelectMultiplesUsers = ({
  users,
  onSelectUser,
  avatarSubtitleType,
}: SelectMultipleUsersProperties) => {
  const [selectedUsers] = useRecoilState(selectedUsersCheckbox)

  const handleChange = async (userID: User['id']) => {
    await onSelectUser(userID)
  }

  return (
    <Stack>
      {users.map((user) => (
        <Box key={user.id} pr={6} display="flex" alignItems="center" justifyContent="space-between">
          <NamedAvatar userID={user.id} subtitleType={avatarSubtitleType} />
          <CheckboxStyled
            isChecked={selectedUsers.includes(user.id)}
            onChange={async () => handleChange(user.id)}
          />
        </Box>
      ))}
    </Stack>
  )
}
