import { createContext } from 'react'

import { defaultContext } from './constants'

export type SearchOption = {
  label: string
  onClick: () => void
}

export type OptionGroup = {
  id: string
  icon: JSX.Element
  options: SearchOption[]
}

export type SearchableListContextValue = {
  items: Array<Record<string, any>>
  optionGroups: OptionGroup[]

  handleSearch: (value: string) => void
  handleNewOptionGroup: (id: string, icon: JSX.Element) => void
  handleNewOptionInGroup: (option: SearchOption, groupID: string) => void
}

export const SearchableListContext = createContext<SearchableListContextValue>(defaultContext)
