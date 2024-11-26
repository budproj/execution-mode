import { Menu, MenuButton, MenuList } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import TreeDotsIcon from 'src/components/Icon/TreeDots'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import meAtom from 'src/state/recoil/user/me'

import { keyResultAtomFamily } from '../../../../../../state/recoil/key-result'
import { GraphQLEffect } from '../../../../../types'

import { CopyAction } from './copy-action'
import { DeleteAction } from './delete-action'
import EditAction from './edit-action'
import messages from './messages'

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
  const intl = useIntl()

  const myID = useRecoilValue(meAtom)

  const isPersonalKr = Boolean(!keyResult?.teamId)

  const canDelete = isPersonalKr
    ? keyResult?.owner?.id === myID
    : keyResult?.policy?.delete === GraphQLEffect.ALLOW

  const canEdit = isPersonalKr
    ? keyResult?.owner?.id === myID
    : keyResult?.policy?.update === GraphQLEffect.ALLOW

  return (
    <KeyResultListBodyColumnBase preventLineClick>
      <Menu placement="bottom-end" variant="action-list">
        <MenuButton
          color="new-gray.600"
          _hover={{
            color: 'new-gray.900',
          }}
          mr={2}
        >
          <TreeDotsIcon
            fill="currentColor"
            fontSize="2xl"
            style={{ transform: 'rotate(90deg)' }}
            desc={intl.formatMessage(messages.optionsButtonDesc)}
          />
        </MenuButton>
        <MenuList>
          {keyResult?.title && <CopyAction keyResultTitle={keyResult.title} />}
          {canEdit && <EditAction id={id} />}
          {canDelete && <DeleteAction id={id} onDelete={onDelete} />}
        </MenuList>
      </Menu>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnActions
