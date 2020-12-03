import { Input } from '@chakra-ui/react'
import React from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'

import { NumberMaskProperties } from 'src/components/KeyResult/NumberMasks/types'

const Base = ({
  defaultValue,
  handleChange,
  displayType = 'input',
  ...rest
}: NumberMaskProperties) => {
  const handleValueChange = ({ floatValue }: NumberFormatValues) => {
    if (handleChange) handleChange(floatValue)
  }

  return (
    <NumberFormat
      customInput={displayType === 'input' ? Input : undefined}
      allowNegative={false}
      displayType={displayType}
      defaultValue={defaultValue ?? 0}
      onValueChange={handleValueChange}
      {...rest}
    />
  )
}

export default Base
