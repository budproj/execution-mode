import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'

import { DangerousActionConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/DangerousAction/wrapper'
import TreeDotsIcon from 'src/components/Icon/TreeDots'

import { useArchiveColumn } from '../../hooks/use-archive-column'
import { useDeleteColumn } from '../../hooks/use-delete-column'
import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'

interface ArchiveAndDeleteMenuProperties {
  boardDomain: BOARD_DOMAIN
  teamId: string
  ids: string[]
}

const ArchiveAndDeleteMenu = ({ boardDomain, teamId, ids }: ArchiveAndDeleteMenuProperties) => {
  const { mutate: archiveMutate } = useArchiveColumn(boardDomain, teamId)
  const { mutate: deleteMutate } = useDeleteColumn(boardDomain, teamId)

  const [isDialogOpen, setDialogOpen] = useState(false)

  const archiveSubmit = useCallback(() => {
    archiveMutate({ ids })
  }, [archiveMutate, ids])

  const deleteSubmit = useCallback(() => {
    deleteMutate({ ids })
  }, [deleteMutate, ids])

  return (
    <Menu>
      <DangerousActionConfirmationDialog
        firstStageDescription="Você perderá todas a tarefas desta coluna, incluindo as atualizações e comentários."
        firstStageTitle="Tem certeza que deseja excluir estas tarefas?"
        isOpen={isDialogOpen}
        keyword="EXCLUIR"
        onConfirm={deleteSubmit}
        onClose={() => setDialogOpen(false)}
      />
      <MenuButton
        color="new-gray.700"
        _hover={{
          bg: 'new-gray.100',
          color: 'new-gray.500',
        }}
        _active={{
          bg: 'new-gray.100',
          color: 'new-gray.500',
        }}
        transform="rotate(90deg)"
      >
        <TreeDotsIcon desc="" fill="currentColor" fontSize="2xl" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={archiveSubmit}>Arquivar todas as tarefas</MenuItem>
        <MenuItem color="red" onClick={() => setDialogOpen(true)}>
          Excluir todas as tarefas
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ArchiveAndDeleteMenu
