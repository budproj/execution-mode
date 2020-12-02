import React from 'react'

import Base from 'src/components/KeyResult/NumberMasks/Base'
import { NumberMaskProperties } from 'src/components/KeyResult/NumberMasks/types'

const Absolute = (properties: NumberMaskProperties) => (
  <Base thousandSeparator="." decimalSeparator="," decimalScale={2} {...properties} />
)

export default Absolute
