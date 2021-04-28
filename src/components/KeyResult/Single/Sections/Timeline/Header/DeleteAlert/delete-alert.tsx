import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import Alert from 'src/components/Base/Alert'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultTimelineIntlDeletedEntryType } from 'src/state/recoil/key-result/timeline'

import messages from './messages'

export interface KeyResultSectionTimelineDeleteAlertProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultSectionTimelineDeleteAlert = ({
  keyResultID,
}: KeyResultSectionTimelineDeleteAlertProperties) => {
  const intlDeletedEntryType = useRecoilValue(keyResultTimelineIntlDeletedEntryType(keyResultID))
  const resetDeleteAlertComponentType = useResetRecoilState(
    keyResultTimelineIntlDeletedEntryType(keyResultID),
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
      wrapperPaddingBottom={4}
      isOpen={Boolean(intlDeletedEntryType)}
      onClose={handleAlertClose}
    />
  )
}

export default KeyResultSectionTimelineDeleteAlert
