import React from 'react'

import Base from 'src/components/KeyResult/NumberMasks/Base'
import { NumberMaskProperties } from 'src/components/KeyResult/NumberMasks/types'

const Absolute = <T extends string | number | undefined>(properties: NumberMaskProperties<T>) => {
  return <Base thousandSeparator="." decimalSeparator="," decimalScale={2} {...properties} />
}

export default Absolute
