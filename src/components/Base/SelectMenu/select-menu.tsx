import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuProps, Button } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { ChevronDown as ChevronDownIcon } from 'src/components/Icons'

import messages from './messages'

export interface SelectMenuProperties extends MenuProps {
  placeholder: ReactElement
  value: string | undefined
  onChange: (value: string | string[]) => void
}

const SelectMenu = ({
  id,
  placeholder,
  onChange,
  value,
  children,
  ...rest
}: SelectMenuProperties) => {
  const intl = useIntl()

  return (
    <Menu {...rest}>
      <MenuButton
        id={id}
        as={Button}
        w="100%"
        borderWidth={2}
        borderColor="gray.100"
        color="gray.400"
        borderRadius={4}
        fontWeight={300}
        rightIcon={<ChevronDownIcon desc={intl.formatMessage(messages.iconChevronDownDesc)} />}
        transition="none"
        py="1.35rem"
        _hover={{ span: { color: 'gray.400' } } as any}
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
