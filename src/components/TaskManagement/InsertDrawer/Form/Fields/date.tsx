import { Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import { TextField, TextFieldProperties } from 'src/components/Base/Form/Fields/text'

import { FormValues } from '../wrapper'

const StyledDateField = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`

export const TaskDateField = ({ id, label, ...rest }: TextFieldProperties<FormValues>) => {
  return <TextField type="date" label={label} id={id} customInput={StyledDateField} {...rest} />
}
