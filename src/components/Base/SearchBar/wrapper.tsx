import { Input, InputGroup, InputLeftElement, StyleProps } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

import SearchIcon from 'src/components/Icon/Search'

import messages from './messages'

export interface SearchProperties extends StyleProps {
  inputBGColor?: string
  placeholder?: string
  onSearch?: (searchValue: string) => void
}

export const SearchBar = ({ placeholder, onSearch, inputBGColor, ...rest }: SearchProperties) => {
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
        {...rest}
        variant="solid"
        bgColor={inputBGColor}
        placeholder={placeholder ?? intl.formatMessage(messages.defaultSearchPlaceholder)}
        onChange={handleChange}
      />
    </InputGroup>
  )
}
