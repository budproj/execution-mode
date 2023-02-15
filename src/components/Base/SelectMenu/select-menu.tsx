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
  BoxProps,
} from '@chakra-ui/react'
import React, { ReactElement, ReactNode } from 'react'
import { useIntl } from 'react-intl'

import ChevronDownIcon from 'src/components/Icon/ChevronDown'

import { getScrollableItem } from '../ScrollableItem'

import messages from './messages'

const ScrollableItem = getScrollableItem()
export interface SelectMenuProperties extends StyleProps {
  value?: string
  onChange: (value: string | string[]) => void
  children: ReactNode
  id?: MenuProps['id']
  isLoading?: boolean
  matchWidth?: MenuProps['matchWidth']
  closeOnSelect?: MenuProps['closeOnSelect']
  isLazy?: MenuProps['isLazy']
  isOpen?: MenuProps['isOpen']
  onOpen?: MenuProps['onOpen']
  scroolable?: boolean
  onClose?: MenuProps['onClose']
  placement?: MenuProps['placement']
  placeholder?: ReactElement | string
  valueLabel?: ReactElement | string
  maxScrollableHeight?: BoxProps['maxHeight']
  isInvalid?: boolean
  style?: any
  _hover?: any
  chevronStyle?: any
  isDisabled?: boolean
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
  maxScrollableHeight = 200,
  isLazy,
  isOpen,
  onOpen,
  onClose,
  scroolable = true,
  placement,
  valueLabel,
  isInvalid,
  chevronStyle,
  isDisabled,
  ...rest
}: SelectMenuProperties) => {
  const intl = useIntl()

  const open = !isDisabled && isOpen

  placeholder ??= intl.formatMessage(messages.defaultPlaceholder)

  return (
    <Menu
      matchWidth={matchWidth}
      isLazy={isLazy}
      isOpen={open}
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
        color={isDisabled ? 'gray.400' : 'gray.500'}
        backgroundColor={isDisabled ? 'new-gray.300' : undefined}
        cursor={isDisabled ? 'default' : undefined}
        borderRadius={4}
        fontWeight={300}
        textAlign="left"
        py={6}
        px={3}
        fontSize="lg"
        _hover={{
          color: isDisabled ? 'gray.400' : 'black.900',
        }}
        rightIcon={
          <Stack direction="row" alignItems="center">
            {isLoading && <Spinner size="sm" color="black.100" />}
            <ChevronDownIcon
              desc={intl.formatMessage(
                open ? messages.iconChevronUpDesc : messages.iconChevronDownDesc,
              )}
              fontSize="xs"
              stroke={isDisabled ? 'new-gray.400' : 'new-gray.800'}
              transition="0.2s all ease-in"
              transform={open ? 'rotate(180deg)' : 'none'}
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
        {scroolable ? (
          <ScrollableItem maxH={maxScrollableHeight}>
            <MenuOptionGroup value={value} type="radio" onChange={onChange}>
              {children}
            </MenuOptionGroup>
          </ScrollableItem>
        ) : (
          <MenuOptionGroup value={value} type="radio" onChange={onChange}>
            {children}
          </MenuOptionGroup>
        )}
      </MenuList>
    </Menu>
  )
}

export default SelectMenu
