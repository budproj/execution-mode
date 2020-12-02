import React from 'react'

import Base from 'src/components/KeyResult/NumberMasks/Base'
import { NumberMaskProperties } from 'src/components/KeyResult/NumberMasks/types'

const CoinBRL = (properties: NumberMaskProperties) => (
  <Base thousandSeparator="." decimalSeparator="," prefix="R$" decimalScale={2} {...properties} />
)

export default CoinBRL
