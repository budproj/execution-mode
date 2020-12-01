import { Input } from '@chakra-ui/react'
import React from 'react'
import NumberFormat from 'react-number-format'

import { NumberMaskProperties } from 'src/components/KeyResult/NumberMasks/types'

const Base = <T extends string | number | undefined>({
  formikField,
  defaultValue,
  displayType = 'input',
  ...rest
}: NumberMaskProperties<T>) => {
  return (
    <NumberFormat
      customInput={displayType === 'input' ? Input : undefined}
      allowNegative={false}
      displayType={displayType}
      defaultValue={defaultValue ?? 0}
      {...formikField}
      {...rest}
    />
  )
}

export default Base
