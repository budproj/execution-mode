import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { MenuItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TreeDotsIcon from '../../Icon/TreeDots'

import messages from './messages'

export type Action = () => void

interface ActionMenuProperties {
  onViewOldCycles?: Action
}

export const ActionMenu = ({ onViewOldCycles }: ActionMenuProperties) => {
  const intl = useIntl()

  return (
    <Menu placement="bottom-end" variant="action-list">
      <MenuButton>
        <TreeDotsIcon
          desc={intl.formatMessage(messages.optionsButtonIconDesc)}
          fill="currentColor"
        />
      </MenuButton>
      <MenuList>
        {onViewOldCycles && (
          <MenuItem onClick={onViewOldCycles}>
            {intl.formatMessage(messages.explorePreviousCyclesOption)}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}
