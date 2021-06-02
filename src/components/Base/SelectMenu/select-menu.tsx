import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuProps,
  Button,
  Stack,
  Spinner,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import ChevronDownIcon from 'src/components/Icon/ChevronDown'

import messages from './messages'

export interface SelectMenuProperties {
  placeholder: ReactElement | string
  value: string | undefined
  onChange: (value: string | string[]) => void
  children: MenuProps['children']
  id?: MenuProps['id']
  isLoading?: boolean
  matchWidth?: MenuProps['matchWidth']
  closeOnSelect?: MenuProps['closeOnSelect']
  isLazy?: MenuProps['isLazy']
  isOpen?: MenuProps['isOpen']
  onOpen?: MenuProps['onOpen']
  onClose?: MenuProps['onClose']
}

const SelectMenu = ({
  id,
  placeholder,
  onChange,
  value,
  children,
  isLoading,
  matchWidth,
  closeOnSelect,
  isLazy,
  isOpen,
  onOpen,
  onClose,
}: SelectMenuProperties) => {
  const intl = useIntl()

  return (
    <Menu
      matchWidth={matchWidth}
      isLazy={isLazy}
      isOpen={isOpen}
      closeOnSelect={closeOnSelect}
      onOpen={onOpen}
      onClose={onClose}
    >
      <MenuButton
        id={id}
        as={Button}
        w="100%"
        borderWidth={2}
        borderColor="gray.100"
        color="gray.500"
        borderRadius={4}
        fontWeight={300}
        textAlign="left"
        py={6}
        px={3}
        fontSize="lg"
        _hover={{
          color: 'black.900',
        }}
        rightIcon={
          <Stack direction="row" alignItems="center">
            {isLoading && <Spinner size="sm" color="black.100" />}
            <ChevronDownIcon
              desc={intl.formatMessage(
                isOpen ? messages.iconChevronUpDesc : messages.iconChevronDownDesc,
              )}
              fontSize="xs"
              color="black.900"
              stroke="black.900"
              transition="0.2s all ease-in"
              transform={isOpen ? 'rotate(180deg)' : 'none'}
            />
          </Stack>
        }
        transition="none"
      >
        {placeholder}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup value={value} type="radio" onChange={onChange}>
          {children}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default SelectMenu
