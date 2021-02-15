import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

export interface KeyResultListBodyColumnPercentualProgressProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const KeyResultListBodyColumnPercentualProgress = ({
  id,
}: KeyResultListBodyColumnPercentualProgressProperties): ReactElement => {
  const keyResult = useRecoilValue(keyResultAtomFamily(id))

  return <KeyResultListBodyColumnBase p={0}>Ok</KeyResultListBodyColumnBase>
}

export default KeyResultListBodyColumnPercentualProgress
