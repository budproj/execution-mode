import { Stack } from '@chakra-ui/layout'
import { HStack } from '@chakra-ui/react'
import React, { useContext } from 'react'

import { SearchableListContext } from './context'
import { SearchableListOptionGroups } from './options'
import { SearchableListSearchBar } from './search-bar'

type SearchableListBodyProperties = {
  placeholder?: string
  children: React.ReactNode
}

export const SearchableListContent = ({ children, placeholder }: SearchableListBodyProperties) => {
  const { optionGroups } = useContext(SearchableListContext)

  return (
    <Stack spacing={4} maxH="full">
      <HStack spacing={2}>
        <SearchableListSearchBar placeholder={placeholder} />
        {optionGroups.length > 0 && <SearchableListOptionGroups />}
      </HStack>
      {children}
    </Stack>
  )
}
