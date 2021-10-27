import React, { useEffect, useState } from 'react'

import { SearchableListContext, SearchableListContextValue } from './context'

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

  const handleSearch = (value: string) => {
    setItems(
      initialItems?.filter((item) => item[searchKey].toLowerCase().includes(value.toLowerCase())) ??
        [],
    )
  }

  const context: SearchableListContextValue = {
    items,
    handleSearch,
  }

  useEffect(() => {
    setItems(initialItems ?? [])
  }, [initialItems, setItems])

  return <SearchableListContext.Provider value={context}>{children}</SearchableListContext.Provider>
}
