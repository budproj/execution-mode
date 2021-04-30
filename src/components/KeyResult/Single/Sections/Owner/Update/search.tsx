import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

import SearchIcon from 'src/components/Icon/Search'

import { KeyResultSingleSectionOwnerUpdateSearchProperties } from './interface'
import messages from './messages'

export const KeyResultSingleSectionOwnerUpdateSearch = ({
  onChange,
}: KeyResultSingleSectionOwnerUpdateSearchProperties) => {
  const intl = useIntl()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (onChange) onChange(value)
  }

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon fill="black.600" desc={intl.formatMessage(messages.iconDesc)} />
      </InputLeftElement>
      <Input
        variant="solid"
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        onChange={handleChange}
      />
    </InputGroup>
  )
}
