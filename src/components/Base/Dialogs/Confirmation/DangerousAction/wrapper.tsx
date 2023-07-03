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
  onlySecondStage?: boolean
  firstStageHeaderImageURL?: string
  secondStageTitle?: string | ReactNode
  secondStageDescription?: string
  inputLabel?: string
}

export const DangerousActionConfirmationDialog = ({
  onConfirm,
  onClose,
  firstStageTitle,
  firstStageDescription,
  onlySecondStage,
  firstStageHeaderImageURL,
  secondStageTitle,
  secondStageDescription,
  confirmButtonColorScheme,
  headerColorScheme,
  inputLabel,
  keyword,
  ...rest
}: DangeousActionConfirmationProperties) => {
  const intl = useIntl()

  firstStageHeaderImageURL ??= '/images/bud-trash-bin.png'
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

  return !onlySecondStage && currentStage === 0 ? (
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
      title={secondStageTitle}
      description={secondStageDescription}
      keyword={keyword}
      inputLabel={inputLabel}
      headerColorScheme={headerColorScheme}
      confirmButtonColorScheme={confirmButtonColorScheme}
      onConfirm={handleSecondStageConfirmation}
      onClose={handleClose}
    />
  )
}
