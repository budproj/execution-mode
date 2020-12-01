import React from 'react'

import Base from 'src/components/KeyResult/NumberMasks/Base'
import { NumberMaskProperties } from 'src/components/KeyResult/NumberMasks/types'

const CoinBRL = <T extends string | number | undefined>(properties: NumberMaskProperties<T>) => {
  return (
    <Base thousandSeparator="." decimalSeparator="," prefix="R$" decimalScale={2} {...properties} />
  )
}

export default CoinBRL
