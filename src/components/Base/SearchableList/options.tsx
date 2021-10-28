import { Menu, MenuButton, MenuList, MenuItem, IconButton, HStack } from '@chakra-ui/react'
import React, { createContext, useContext, useEffect } from 'react'

import { OptionGroup, SearchableListContext, SearchOption } from './context'

type SearchableListOptionGroupProperties = {
  id: string
  icon: JSX.Element
  children: JSX.Element
}

type SearchableListOptionProperties = {
  children: string
  onClick: () => void
}

type OptionGroupContext = {
  id: string
}

const OptionGroupContext = createContext<OptionGroupContext>({
  id: '',
})

export const SearchableListOptionGroup = ({
  id,
  icon,
  children,
}: SearchableListOptionGroupProperties) => {
  const { handleNewOptionGroup } = useContext(SearchableListContext)

  const groupContext: OptionGroupContext = {
    id,
  }

  useEffect(() => {
    handleNewOptionGroup(id, icon)
  }, [id, icon, handleNewOptionGroup])

  return <OptionGroupContext.Provider value={groupContext}>{children}</OptionGroupContext.Provider>
}

export const SearchableListOption = ({ children, onClick }: SearchableListOptionProperties) => {
  const { handleNewOptionInGroup } = useContext(SearchableListContext)
  const { id: groupID } = useContext(OptionGroupContext)

  useEffect(() => {
    const option: SearchOption = {
      onClick,
      label: children,
    }

    handleNewOptionInGroup(option, groupID)
  }, [children, onClick, groupID, handleNewOptionInGroup])

  // eslint-disable-next-line unicorn/no-null
  return null
}

export const SearchableListOptionGroups = () => {
  const { optionGroups } = useContext(SearchableListContext)

  return (
    <HStack spacing={4}>
      {optionGroups.map((group) => (
        <SearchableListSingleOptionGroup key={group.id} {...group} />
      ))}
    </HStack>
  )
}

const SearchableListSingleOptionGroup = ({ icon, options }: OptionGroup) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={icon}
        aria-label="teste"
        size="md"
        fontSize="sm"
        bg="new-gray.200"
        color="new-gray.800"
        _hover={{
          color: 'brand.500',
        }}
      />
      <MenuList p={2} w="xs" boxShadow="with-stroke.dark" borderColor="new-gray.200">
        {options.map((option) => (
          <MenuItem
            key={option.label}
            color="gray.500"
            colorScheme="gray"
            p={2}
            fontWeight={400}
            w="100%"
            justifyContent="flex-start"
            variant="ghost"
            borderWidth={0}
            _active={{
              color: 'brand.500',
            }}
            onClick={option.onClick}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
