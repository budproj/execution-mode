import React from 'react'
import { useIntl } from 'react-intl'

import { DANGERS_ACTIONS_HEADER_COLORS_SCHEME } from 'src/components/Base/Dialogs/Confirmation/Base/Sections/header'
import { DangerousActionConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/DangerousAction/wrapper'

import messages from './messages'

interface ConfirmPublishingDialogProperties {
  isOpen: boolean
  onClose?: () => void
}

const ConfirmPublishingDialog = ({ isOpen, onClose }: ConfirmPublishingDialogProperties) => {
  const intl = useIntl()

  const handleClose = () => {
    if (onClose) void onClose()
  }

  const handleConfirm = async () => {
    if (onClose) void onClose()
  }

  return (
    <DangerousActionConfirmationDialog
      onlySecondStage
      isOpen={isOpen}
      keyword={intl.formatMessage(messages.keyword)}
      confirmationLabel={intl.formatMessage(messages.confirmationLabel)}
      secondStageTitle={intl.formatMessage(messages.secondStageTitle, { breakline: <br /> })}
      secondStageDescription={intl.formatMessage(messages.secondStageDescription)}
      firstStageTitle=""
      firstStageDescription=""
      inputLabel={intl.formatMessage(messages.inputLabel)}
      confirmButtonColorScheme="green"
      headerColorScheme={DANGERS_ACTIONS_HEADER_COLORS_SCHEME.GREEN}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  )
}

export default ConfirmPublishingDialog
