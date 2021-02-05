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
      {({ isOpen }) => (
        <>
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
                  desc={intl.formatMessage(
                    isOpen ? messages.iconChevronUpDesc : messages.iconChevronDownDesc,
                  )}
                  fontSize="xs"
                  color="gray.50"
                  stroke="gray.50"
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
