import { Image } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import {
  StyledAlertActionArea,
  StyledAlertCancelButton,
  StyledAlertConfirmationButton,
  StyledAlertDescription,
  StyledAlertHeading,
} from './base-components'
import messages from './messages'

interface ConfirmationDialogProperties {
  onConfirm: () => void
  onClose: () => void
  type: string
  description?: string
}

export const ConfirmationMessage = ({
  onConfirm,
  onClose,
  type,
  description,
}: ConfirmationDialogProperties) => {
  const intl = useIntl()

  return (
    <>
      <Image src="/images/bud-trash-bin.png" />

      <StyledAlertHeading>
        {intl.formatMessage(messages.confirmationDialogTitle, {
          type,
        })}
      </StyledAlertHeading>
      {description && <StyledAlertDescription>{description}</StyledAlertDescription>}

      <StyledAlertActionArea>
        <StyledAlertConfirmationButton onClick={onConfirm}>
          {intl.formatMessage(messages.dialogConfirmationButton, {
            type,
          })}
        </StyledAlertConfirmationButton>
        <StyledAlertCancelButton onClick={onClose}>
          {intl.formatMessage(messages.dialogCancelButton)}
        </StyledAlertCancelButton>
      </StyledAlertActionArea>
    </>
  )
}
