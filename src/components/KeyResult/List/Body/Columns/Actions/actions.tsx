import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'

import { keyResultAtomFamily } from '../../../../../../state/recoil/key-result'
import { GraphQLEffect } from '../../../../../types'

import { DeleteAction } from './delete'

export interface KeyResultListBodyColumnActionsProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  onDelete?: (id?: string) => void
}

const KeyResultListBodyColumnActions = ({
  id,
  onDelete,
}: KeyResultListBodyColumnActionsProperties): ReactElement => {
  const keyResult = useRecoilValue(keyResultAtomFamily(id))

  const canDelete = keyResult?.policy?.delete === GraphQLEffect.ALLOW

  return (
    <KeyResultListBodyColumnBase preventLineClick>
      {canDelete && <DeleteAction id={id} onDelete={onDelete} />}
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnActions
