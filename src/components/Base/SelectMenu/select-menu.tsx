import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuProps,
  Button,
  Stack,
  Spinner,
  StyleProps,
} from '@chakra-ui/react'
import Scrollbars from 'rc-scrollbars'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import ChevronDownIcon from 'src/components/Icon/ChevronDown'

import messages from './messages'

export interface SelectMenuProperties extends StyleProps {
  value?: string
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
  placement?: MenuProps['placement']
  placeholder?: ReactElement | string
  valueLabel?: ReactElement | string
  isInvalid?: boolean
  style?: any
  _hover?: any
  chevronStyle?: any
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
  placement,
  valueLabel,
  isInvalid,
  chevronStyle,
  ...rest
}: SelectMenuProperties) => {
  const intl = useIntl()

  placeholder ??= intl.formatMessage(messages.defaultPlaceholder)

  return (
    <Menu
      matchWidth={matchWidth}
      isLazy={isLazy}
      isOpen={isOpen}
      closeOnSelect={closeOnSelect}
      placement={placement}
      onOpen={onOpen}
      onClose={onClose}
    >
      <MenuButton
        id={id}
        as={Button}
        w="100%"
        borderWidth={isInvalid ? 3 : 2}
        borderColor={isInvalid ? 'red.500' : 'new-gray.400'}
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
              color="new-gray.800"
              stroke="new-gray.800"
              transition="0.2s all ease-in"
              transform={isOpen ? 'rotate(180deg)' : 'none'}
              {...chevronStyle}
            />
          </Stack>
        }
        transition="none"
        {...rest}
      >
        {valueLabel ?? placeholder}
      </MenuButton>
      <MenuList
        boxShadow="with-stroke.light"
        borderColor="new-gray.200"
        borderWidth={1}
        overflow="hidden"
        zIndex={999}
      >
        <Scrollbars autoHeight>
          <MenuOptionGroup value={value} type="radio" onChange={onChange}>
            {children}
          </MenuOptionGroup>
        </Scrollbars>
      </MenuList>
    </Menu>
  )
}

export default SelectMenu
