import { Stack } from '@chakra-ui/layout'
import { HStack } from '@chakra-ui/react'
import React, { useContext } from 'react'

import { SearchableListContext } from './context'
import { SearchableListOptionGroups } from './options'
import { SearchableListSearchBar } from './search-bar'

type SearchableListBodyProperties = {
  children: React.ReactNode
}

export const SearchableListContent = ({ children }: SearchableListBodyProperties) => {
  const { optionGroups } = useContext(SearchableListContext)

  return (
    <Stack spacing={4} maxH="full">
      <HStack spacing={4}>
        <SearchableListSearchBar />
        {optionGroups.length > 0 && <SearchableListOptionGroups />}
      </HStack>
      {children}
    </Stack>
  )
}
