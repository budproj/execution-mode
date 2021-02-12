import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import Alert from 'src/components/Base/Alert'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultDrawerIntlDeletedEntryType } from 'src/state/recoil/key-result/drawer'

import messages from './messages'

export interface KeyResultDrawerDeleteAlertProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerDeleteAlert = ({ keyResultID }: KeyResultDrawerDeleteAlertProperties) => {
  const intlDeletedEntryType = useRecoilValue(keyResultDrawerIntlDeletedEntryType(keyResultID))
  const resetDeleteAlertComponentType = useResetRecoilState(
    keyResultDrawerIntlDeletedEntryType(keyResultID),
  )
  const intl = useIntl()

  const handleAlertClose = () => {
    resetDeleteAlertComponentType()
  }

  const type = intlDeletedEntryType?.toLowerCase()

  return (
    <Alert
      title={intl.formatMessage(messages.title, { type })}
      description={intl.formatMessage(messages.description)}
      status="success"
      variant="outline"
      wrapperPadding={4}
      wrapperPaddingBottom={0}
      isOpen={Boolean(intlDeletedEntryType)}
      onClose={handleAlertClose}
    />
  )
}

export default KeyResultDrawerDeleteAlert
