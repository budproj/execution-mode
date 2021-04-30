import { Input } from '@chakra-ui/input'
import React, { ChangeEvent } from 'react'

import { KeyResultSingleSectionOwnerUpdateSearchProperties } from './interface'

export const KeyResultSingleSectionOwnerUpdateSearch = ({
  onChange,
}: KeyResultSingleSectionOwnerUpdateSearchProperties) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (onChange) onChange(value)
  }

  return <Input onChange={handleChange} />
}
