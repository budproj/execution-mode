import React from 'react'

import { KeyResult } from 'src/components/KeyResult/types'

export interface CurrentConfidenceFieldProperties {
  keyResultID?: KeyResult['id']
}

const CurrentConfidence = ({ keyResultID }: CurrentConfidenceFieldProperties) => {
  console.log(keyResultID)

  return <p>Ok</p>
}

export default CurrentConfidence
