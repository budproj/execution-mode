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
  placeholder: ReactElement
  value: string | undefined
  onChange: (value: string | string[]) => void
  children: MenuProps['children']
  id?: MenuProps['id']
  isLoading?: boolean
  matchWidth?: MenuProps['matchWidth']
}

const SelectMenu = ({
  id,
  placeholder,
  onChange,
  value,
  children,
  isLoading,
  matchWidth,
}: SelectMenuProperties) => {
  const intl = useIntl()

  return (
    <Menu matchWidth={matchWidth}>
      {({ isOpen }) => (
        <>
          <MenuButton
            id={id}
            as={Button}
            w="100%"
            borderWidth={2}
            borderColor="black.100"
            color="black.400"
            borderRadius={4}
            fontWeight={300}
            py={6}
            pl={2}
            pr={5}
            rightIcon={
              <Stack direction="row" alignItems="center">
                {isLoading && <Spinner size="sm" color="black.100" />}
                <ChevronDownIcon
                  desc={intl.formatMessage(
                    isOpen ? messages.iconChevronUpDesc : messages.iconChevronDownDesc,
                  )}
                  fontSize="xs"
                  color="black.50"
                  stroke="black.50"
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
        </>
      )}
    </Menu>
  )
}

export default SelectMenu
