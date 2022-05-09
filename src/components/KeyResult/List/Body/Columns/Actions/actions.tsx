import { Menu, MenuButton, MenuList } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import TreeDotsIcon from 'src/components/Icon/TreeDots'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'

import { keyResultAtomFamily } from '../../../../../../state/recoil/key-result'
import { GraphQLEffect } from '../../../../../types'

import { CopyAction } from './copy-action'
import { DeleteAction } from './delete-action'

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

  console.log({ keyResult })

  return (
    <KeyResultListBodyColumnBase preventLineClick>
      <Menu placement="bottom-end" variant="action-list">
        <MenuButton transform="rotate(90deg)">
          <TreeDotsIcon desc="teste" fill="#6F6EFF" rotate={160} width="16px" height="16px" />
        </MenuButton>
        <MenuList>
          {keyResult?.title && <CopyAction keyResultTitle={keyResult.title} />}
          {canDelete && <DeleteAction id={id} onDelete={onDelete} />}
        </MenuList>
      </Menu>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnActions
