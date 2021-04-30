import { Input } from '@chakra-ui/input'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

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
    <Input
      variant="solid"
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      onChange={handleChange}
    />
  )
}
