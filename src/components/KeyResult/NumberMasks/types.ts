import { InputProps } from '@chakra-ui/react'
import { FieldInputProps } from 'formik'
import { NumberFormatProps } from 'react-number-format'

export interface NumberMaskProperties<T> extends NumberFormatProps {
  handleChange?: (value: NumberFormatProps['value']) => void
  formikField?: FieldInputProps<T>
  isDisabled?: InputProps['isDisabled']
}
