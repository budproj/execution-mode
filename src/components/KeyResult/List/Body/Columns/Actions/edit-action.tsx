import { MenuItem } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { isEditingKeyResultIDAtom } from 'src/state/recoil/key-result/drawers/editing/is-editing-key-result-id'
import { keyResultInsertDrawerObjectiveID } from 'src/state/recoil/key-result/drawers/insert/objective-id'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import messages from './messages'

interface EditActionProperties {
  id?: string
}

const EditAction = ({ id }: EditActionProperties) => {
  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(id))
  const setKeyResultInsertDrawerObjectiveID = useSetRecoilState(keyResultInsertDrawerObjectiveID)
  const isEditingKeyResultId = useSetRecoilState(isEditingKeyResultIDAtom)

  const resetOpenDrawer = useResetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const handleEditClick = () => {
    setKeyResultInsertDrawerObjectiveID(id)
    isEditingKeyResultId(keyResult?.id)
    resetOpenDrawer()
  }

  return (
    <MenuItem onClick={handleEditClick}>
      {intl.formatMessage(messages.editButtonLabelMessage)}
    </MenuItem>
  )
}

export default EditAction
