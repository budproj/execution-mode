import { SearchableListContextValue, SearchOption } from './context'

export const defaultContext: SearchableListContextValue = {
  items: [],
  optionGroups: [],

  handleSearch: () => {
    throw new Error('You must implement a handle search function for your SearchableList context')
  },
  handleNewOptionGroup: (_id: string, _icon: JSX.Element) => {
    throw new Error(
      'You must implement a handle new option group function for your SearchableList context',
    )
  },
  handleNewOptionInGroup: (_option: SearchOption, _groupID: string) => {
    throw new Error(
      'You must implement a handle new option in group function for your SearchableList context',
    )
  },
}
