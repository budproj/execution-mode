import { MenuItem, MenuItemProps } from '@chakra-ui/react'
import React from 'react'

export const ObjectiveMenuOption = (properties: MenuItemProps) => (
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
    {...properties}
  />
)
