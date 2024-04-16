import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useCallback } from 'react'

import TreeDotsIcon from 'src/components/Icon/TreeDots'

import { useArchiveColumn } from '../../hooks/use-archive-column'
import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'

interface ArchiveAndDeleteMenuProperties {
  boardDomain: BOARD_DOMAIN
  teamId: string
  ids: string[]
}

const ArchiveAndDeleteMenu = ({ boardDomain, teamId, ids }: ArchiveAndDeleteMenuProperties) => {
  const { mutate: archiveMutate } = useArchiveColumn(boardDomain, teamId)

  const archiveSubmit = useCallback(() => {
    archiveMutate({ ids })
  }, [archiveMutate, ids])

  return (
    <Menu>
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
        <MenuItem color="red">Excluir todas as tarefas</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ArchiveAndDeleteMenu
