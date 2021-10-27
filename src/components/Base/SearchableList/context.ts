import { createContext } from 'react'

import { defaultContext } from './constants'

export type SearchableListContextValue = {
  items: Array<Record<string, any>>
  handleSearch: (value: string) => void
}

export const SearchableListContext = createContext<SearchableListContextValue>(defaultContext)
