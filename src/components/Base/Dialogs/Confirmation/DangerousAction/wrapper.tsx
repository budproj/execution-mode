import React, { ReactNode, useState } from 'react'
import { useIntl } from 'react-intl'

import { ConfirmationDialogProperties } from '../Base/interface'
import { ConfirmationDialog } from '../Base/wrapper'
import {
  KeywordBasedConfirmation,
  KeywordBasedConfirmationProperties,
} from '../KeywordBased/wrapper'

import messages from './messages'

interface DangeousActionConfirmationProperties
  extends ConfirmationDialogProperties,
    KeywordBasedConfirmationProperties {
  firstStageTitle: string
  firstStageDescription: string
  firstStageHeaderImageURL?: string
  secondStageTitle?: string | ReactNode
  secondStageDescription?: string
  secondStageHeaderImageURL?: string
}

export const DangerousActionConfirmationDialog = ({
  onConfirm,
  onClose,
  firstStageTitle,
  firstStageDescription,
  firstStageHeaderImageURL,
  secondStageTitle,
  secondStageDescription,
  secondStageHeaderImageURL,
  keyword,
  ...rest
}: DangeousActionConfirmationProperties) => {
  const intl = useIntl()

  firstStageHeaderImageURL ??= '/images/bud-trash-bin.png'
  secondStageHeaderImageURL ??= '/images/bud-danger.png'
  secondStageTitle ??= intl.formatMessage(messages.defaultSecondStageTitle)
  secondStageDescription ??= intl.formatMessage(messages.defaultSecondStageDescription, {
    keyword,
  })

  const [currentStage, setCurrentStage] = useState(0)

  const handleFirstStageConfirmation = () => setCurrentStage(1)
  const handleSecondStageConfirmation = () => {
    onConfirm()
    setCurrentStage(0)
  }

  const handleClose = () => {
    onClose()
    setCurrentStage(0)
  }

  return currentStage === 0 ? (
    <ConfirmationDialog
      {...rest}
      headerImageURL={firstStageHeaderImageURL}
      title={firstStageTitle}
      description={firstStageDescription}
      onConfirm={handleFirstStageConfirmation}
      onClose={handleClose}
    />
  ) : (
    <KeywordBasedConfirmation
      {...rest}
      headerImageURL={secondStageHeaderImageURL}
      title={secondStageTitle}
      description={secondStageDescription}
      keyword={keyword}
      onConfirm={handleSecondStageConfirmation}
      onClose={handleClose}
    />
  )
}
