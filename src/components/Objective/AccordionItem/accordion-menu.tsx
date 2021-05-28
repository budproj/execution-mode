import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { MenuItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TreeDotsIcon from '../../Icon/TreeDots'

import messages from './messages'

const stopAccordionOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation()
}

export const ObjectiveAccordionMenu = () => {
  const intl = useIntl()

  return (
    <Menu placement="bottom-end">
      <MenuButton
        bg="black.100"
        borderRadius={4}
        px={3}
        py={2}
        h="full"
        color="gray.500"
        _hover={{
          bg: 'brand.100',
          color: 'brand.500',
        }}
        _active={{
          bg: 'brand.100',
          color: 'brand.500',
        }}
        onClick={stopAccordionOpen}
      >
        <TreeDotsIcon
          desc={intl.formatMessage(messages.optionsButtonIconDesc)}
          fill="currentColor"
        />
      </MenuButton>
      <MenuList p={3} boxShadow="md">
        <MenuItem
          p={2}
          borderRadius={4}
          borderColor="transparent"
          color="gray.300"
          transition="all 0.2s ease-in-out"
          _hover={{
            bg: 'gray.50',
            color: 'gray.500',
          }}
          _focus={{
            bg: 'gray.50',
            color: 'gray.500',
          }}
        >
          Teste
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
