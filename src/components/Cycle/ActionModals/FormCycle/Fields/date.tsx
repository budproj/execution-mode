import { Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import { CycleTextField, CycleTextFieldProperties } from './text'

const StyledDateField = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`

export const CycleDateField = ({ id, label }: CycleTextFieldProperties) => {
  return <CycleTextField type="date" label={label} id={id} customInput={StyledDateField} />
}
