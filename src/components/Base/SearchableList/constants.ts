import { SearchableListContextValue } from './context'

export const defaultContext: SearchableListContextValue = {
  items: [],
  options: [],
  handleSearch: () => {
    throw new Error('You must implement a handle search function for your SearchableList context')
  },
}
