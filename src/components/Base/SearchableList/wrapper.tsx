import React, { useEffect, useState } from 'react'

import { SearchableListContent } from './content'
import {
  OptionGroup,
  SearchableListContext,
  SearchableListContextValue,
  SearchOption,
} from './context'

type SearchableListWrapperProperties<T> = {
  initialItems?: T[]
  searchKey: keyof T
  placeholder?: string
  children: React.ReactNode
  isSearchBarVisible?: boolean
}

export const SearchableListWrapper = <T extends Record<string, any>>({
  searchKey,
  placeholder,
  initialItems,
  isSearchBarVisible,
  children,
}: SearchableListWrapperProperties<T>) => {
  isSearchBarVisible ??= true

  const [items, setItems] = useState(initialItems ?? [])
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([])
  const [query, setQuery] = useState('')

  const handleSearch = (value: string): void => {
    setQuery(value)
    setItems(
      initialItems?.filter((item) => item[searchKey].toLowerCase().includes(value.toLowerCase())) ??
        [],
    )
  }

  const handleNewOptionGroup = (id: string, icon: JSX.Element): void => {
    const hasOptionGroup = optionGroups.some((group) => group.id === id)
    if (hasOptionGroup) return

    const optionGroup: OptionGroup = {
      id,
      icon,
      options: [],
    }

    setOptionGroups([...optionGroups, optionGroup])
  }

  const handleNewOptionInGroup = (newOption: SearchOption, groupID: string): void => {
    const groupIndex = optionGroups.findIndex((group) => group.id === groupID)
    if (groupIndex === -1) return

    const group = optionGroups[groupIndex]
    const hasOption = group.options.some((option) => option.label === newOption.label)
    if (hasOption) return

    optionGroups[groupIndex].options = [...group.options, newOption]
    setOptionGroups(optionGroups)
  }

  const handleNewItem = (item: T): void => {
    const newItems = [item, ...items]
    setItems(newItems)
  }

  const context: SearchableListContextValue = {
    items,
    optionGroups,
    query,

    handleSearch,
    handleNewOptionGroup,
    handleNewOptionInGroup,
    handleNewItem,
  }

  useEffect(() => {
    setItems(initialItems ?? [])
  }, [initialItems, setItems])

  return (
    <SearchableListContext.Provider value={context}>
      <SearchableListContent placeholder={placeholder} isSearchBarVisible={isSearchBarVisible}>
        {children}
      </SearchableListContent>
    </SearchableListContext.Provider>
  )
}
