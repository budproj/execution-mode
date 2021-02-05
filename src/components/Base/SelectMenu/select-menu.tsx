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

import { ChevronDown as ChevronDownIcon } from 'src/components/Icon'

import messages from './messages'

export interface SelectMenuProperties extends MenuProps {
  placeholder: ReactElement
  value: string | undefined
  onChange: (value: string | string[]) => void
  isLoading?: boolean
}

const SelectMenu = ({
  id,
  placeholder,
  onChange,
  value,
  children,
  isLoading,
}: SelectMenuProperties) => {
  const intl = useIntl()

  return (
    <Menu>
      <MenuButton
        id={id}
        as={Button}
        w="100%"
        borderWidth={2}
        borderColor="gray.100"
        color="gray.400"
        borderRadius={4}
        fontWeight={300}
        py={6}
        pl={2}
        pr={5}
        rightIcon={
          <Stack direction="row" alignItems="center">
            {isLoading && <Spinner size="sm" color="gray.100" />}
            <ChevronDownIcon
              desc={intl.formatMessage(messages.iconChevronDownDesc)}
              fontSize="12px"
            />
          </Stack>
        }
        transition="none"
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
