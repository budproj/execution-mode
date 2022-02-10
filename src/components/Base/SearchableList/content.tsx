import { Stack, HStack } from '@chakra-ui/react'
import React, { useContext } from 'react'

import { SearchableListContext } from './context'
import { SearchableListOptionGroups } from './options'
import { SearchableListSearchBar } from './search-bar'

type SearchableListBodyProperties = {
  placeholder?: string
  children: React.ReactNode
  isSearchBarVisible: boolean
}

export const SearchableListContent = ({
  children,
  placeholder,
  isSearchBarVisible,
}: SearchableListBodyProperties) => {
  const { optionGroups } = useContext(SearchableListContext)

  return (
    <Stack spacing={4} maxH="full">
      <HStack spacing={2}>
        {isSearchBarVisible && <SearchableListSearchBar placeholder={placeholder} />}
        {optionGroups.length > 0 && isSearchBarVisible && <SearchableListOptionGroups />}
      </HStack>
      {children}
    </Stack>
  )
}
