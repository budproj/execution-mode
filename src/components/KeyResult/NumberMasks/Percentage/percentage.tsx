import React from 'react'

import Base from 'src/components/KeyResult/NumberMasks/Base'
import { NumberMaskProperties } from 'src/components/KeyResult/NumberMasks/types'

const Percentage = (properties: NumberMaskProperties) => (
  <Base decimalSeparator="," suffix="%" decimalScale={2} {...properties} />
)

export default Percentage
