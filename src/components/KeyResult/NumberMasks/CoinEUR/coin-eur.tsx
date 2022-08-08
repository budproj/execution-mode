import React from 'react'

import Base from 'src/components/KeyResult/NumberMasks/Base'
import { NumberMaskProperties } from 'src/components/KeyResult/NumberMasks/types'

const CoinEUR = (properties: NumberMaskProperties) => (
  <Base thousandSeparator="." decimalSeparator="," prefix="€" decimalScale={2} {...properties} />
)

export default CoinEUR
