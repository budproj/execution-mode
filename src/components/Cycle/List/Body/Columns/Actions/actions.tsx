import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { Cycle } from 'src/components/Cycle/types'

import { keyResultAtomFamily } from '../../../../../../state/recoil/key-result'
import { GraphQLEffect } from '../../../../../types'

import { DeleteAction } from './delete'

export interface CyclesListBodyColumnActionsProperties extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
  onDelete?: (id?: string) => void
}

const CyclesListBodyColumnActions = ({
  id,
  onDelete,
}: CyclesListBodyColumnActionsProperties): ReactElement => {
  const keyResult = useRecoilValue(keyResultAtomFamily(id))

  const canDelete = keyResult?.policy?.delete === GraphQLEffect.ALLOW

  return (
    <CyclesListBodyColumnBase preventLineClick>
      {canDelete && <DeleteAction id={id} onDelete={onDelete} />}
    </CyclesListBodyColumnBase>
  )
}

export default CyclesListBodyColumnActions
