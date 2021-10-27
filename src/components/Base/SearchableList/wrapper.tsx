import React, { useEffect, useState } from 'react'

import { SearchableListContent } from './content'
import {
  OptionGroup,
  SearchableListContext,
  SearchableListContextValue,
  SearchOption,
} from './context'

type SearchableListWrapperProperties<T> = {
  children: React.ReactNode
  searchKey: keyof T
  initialItems?: T[]
}

export const SearchableListWrapper = <T extends Record<string, any>>({
  children,
  searchKey,
  initialItems,
}: SearchableListWrapperProperties<T>) => {
  const [items, setItems] = useState(initialItems ?? [])
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([])

  const handleSearch = (value: string): void => {
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

  const context: SearchableListContextValue = {
    items,
    optionGroups,

    handleSearch,
    handleNewOptionGroup,
    handleNewOptionInGroup,
  }

  useEffect(() => {
    setItems(initialItems ?? [])
  }, [initialItems, setItems])

  return (
    <SearchableListContext.Provider value={context}>
      <SearchableListContent>{children}</SearchableListContent>
    </SearchableListContext.Provider>
  )
}
