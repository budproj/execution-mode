import { Stack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { MessageDescriptor } from '@formatjs/intl'
import React from 'react'
import { useIntl } from 'react-intl'

import { UserEmptyState } from '../../EmptyState/wrapper'

import messages from './messages'

type SelectUserFromListEmptyStateProperties = {
  title?: MessageDescriptor
  hasCreatePermission?: boolean
  onCreateStart: () => void
  onAddMember: () => void
}

export const SelectUserFromListEmptyState = ({
  title,
  hasCreatePermission,
  onCreateStart,
  onAddMember,
}: SelectUserFromListEmptyStateProperties) => {
  const intl = useIntl()

  return (
    <Stack pt={2} pb={8} spacing={0}>
      <UserEmptyState title={title} py={0} />
      {hasCreatePermission && (
        <Menu placement="bottom-start" variant="action-list">
          <MenuButton fontSize={14} fontWeight={500} pt={4} color="brand.500">
            {intl.formatMessage(messages.addNewUserToTeam)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onCreateStart}>
              {intl.formatMessage(messages.createNewUserButtonLabel)}
            </MenuItem>
            <MenuItem onClick={onAddMember}>
              {intl.formatMessage(messages.addUserToTeamOption)}
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Stack>
  )
}
