import { Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import HistoryIcon from 'src/components/Icon/History'
import TrashIcon from 'src/components/Icon/Trash'
import TreeDotsIcon from 'src/components/Icon/TreeDots'
import { isArchivedBoardAtom } from 'src/state/recoil/task-management/board/is-archived-board'

import messages from './messages'

interface KanbanTaskCardActionsProperties {
  readonly onDelete: () => void
  readonly onArchive?: () => void
}

export const KanbanTaskCardActions = ({ onDelete, onArchive }: KanbanTaskCardActionsProperties) => {
  const intl = useIntl()
  const toast = useToast()

  const isArchivedBoard = useRecoilValue(isArchivedBoardAtom)

  const handleDelete = (event?: React.MouseEvent<HTMLButtonElement>) => {
    onDelete()
    if (event) event.stopPropagation()
  }

  const handleArchive = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (onArchive) {
      onArchive()
      toast({
        status: 'success',
        title: isArchivedBoard ? 'Você desarquivou uma tarefa.' : 'Tarefa arquivada com sucesso!',
      })
    }

    if (event) event.stopPropagation()
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
        <MenuItem color="gray" maxW="160px" onClick={handleArchive}>
          <HistoryIcon desc="dsada" w=".8em" h="1.2em" mr={2} stroke="currentcolor" />
          {isArchivedBoard ? 'Desarquivar' : 'Arquivar'}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
