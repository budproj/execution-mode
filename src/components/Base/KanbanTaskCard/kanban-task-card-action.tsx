import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TrashIcon from 'src/components/Icon/Trash'
import TreeDotsIcon from 'src/components/Icon/TreeDots'

import messages from './messages'

interface KanbanTaskCardActionsProperties {
  readonly onDelete: () => void
}

export const KanbanTaskCardActions = ({ onDelete }: KanbanTaskCardActionsProperties) => {
  const intl = useIntl()

  const handleDelete = (event) => {
    onDelete()
    event.stopPropagation()
  }

  return (
    <Menu isLazy placement="auto-end" variant="action-list">
      <MenuButton
        maxW="120px"
        cursor="pointer"
        color="new-gray.800"
        _hover={{
          color: 'new-gray.300',
        }}
        bg="transparent"
        onClick={(event) => event.stopPropagation()}
      >
        <TreeDotsIcon
          fill="currentColor"
          fontSize="2xl"
          style={{ transform: 'rotate(90deg)' }}
          desc="excluir"
        />
      </MenuButton>
      <MenuList minW="120px">
        <MenuItem color="red.500" maxW="160px" onClick={handleDelete}>
          <TrashIcon
            version="kanban"
            desc="dsada"
            w=".8em"
            h="1.2em"
            mr={2}
            stroke="currentcolor"
          />
          {intl.formatMessage(messages.deleteButtonAction)}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
