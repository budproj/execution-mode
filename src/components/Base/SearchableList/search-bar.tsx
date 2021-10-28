import React, { useContext } from 'react'

import { SearchBar } from '../SearchBar/wrapper'

import { SearchableListContext } from './context'

type SearchBarInContextProperties = {
  placeholder?: string
}

export const SearchableListSearchBar = ({ placeholder }: SearchBarInContextProperties) => {
  const { handleSearch } = useContext(SearchableListContext)

  return <SearchBar placeholder={placeholder} onSearch={handleSearch} />
}
