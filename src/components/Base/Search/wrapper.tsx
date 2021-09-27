import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

import SearchIcon from 'src/components/Icon/Search'

import messages from './messages'

export interface SearchProperties {
  placeholder?: string
  onSearch?: (searchValue: string) => void
}

export const Search = ({ placeholder, onSearch }: SearchProperties) => {
  const intl = useIntl()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (onSearch) onSearch(value)
  }

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon fill="new-gray.600" desc={intl.formatMessage(messages.iconDesc)} />
      </InputLeftElement>
      <Input
        variant="solid"
        placeholder={placeholder ?? intl.formatMessage(messages.defaultSearchPlaceholder)}
        onChange={handleChange}
      />
    </InputGroup>
  )
}
