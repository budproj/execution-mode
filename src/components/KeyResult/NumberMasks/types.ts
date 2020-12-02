import { InputProps } from '@chakra-ui/react'
import { NumberFormatProps } from 'react-number-format'

export interface NumberMaskProperties extends NumberFormatProps {
  handleChange?: (value: NumberFormatProps['value']) => void
  isDisabled?: InputProps['isDisabled']
}
