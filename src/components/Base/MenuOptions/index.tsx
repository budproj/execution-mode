import { Menu, MenuButton, MenuItem, MenuList, Stack, StyleProps, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TreeDotsIcon from 'src/components/Icon/TreeDots'

import messages from './messages'

export interface Option {
  value: string
  onSelect: () => Promise<void> | void
}

interface IMenuOptions extends StyleProps {
  options: Option[]
  legend?: string
}

const CustomMenuOptions = ({ options, legend, ...rest }: IMenuOptions) => {
  const intl = useIntl()

  return (
    <Stack align="center" {...rest}>
      <Menu placement="bottom-end" variant="action-list">
        <MenuButton
          bg="new-gray.200"
          borderRadius={10}
          color="new-gray.700"
          p={2}
          _hover={{
            bg: 'new-gray.100',
            color: 'new-gray.500',
          }}
          _active={{
            bg: 'new-gray.100',
            color: 'new-gray.500',
          }}
        >
          <TreeDotsIcon
            desc={intl.formatMessage(messages.treeDotsIconDescription)}
            fill="currentColor"
            fontSize="2xl"
          />
        </MenuButton>
        <MenuList>
          {options.map(({ onSelect, value }) => (
            <MenuItem key={value + Math.random().toString()} onClick={onSelect}>
              {value}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {legend && (
        <Text color="new-gray.600" fontSize={12}>
          {legend}
        </Text>
      )}
    </Stack>
  )
}

export default CustomMenuOptions
