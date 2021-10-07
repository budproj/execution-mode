import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { FormLabel, Image } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { useIntl } from 'react-intl'

import {
  StyledAlertActionArea,
  StyledAlertCancelButton,
  StyledAlertConfirmationButton,
  StyledAlertDescription,
  StyledAlertHeading,
} from './base-components'
import messages from './messages'

interface DangerousActionDialogProperties {
  onClose: () => void
  onConfirm: () => void
  type: string
  keyword?: string
}

export const DangerousMessage = ({
  onClose,
  onConfirm,
  type,
  keyword,
}: DangerousActionDialogProperties) => {
  const [isValidKeyword, setIsValidKeyword] = useState(false)
  const intl = useIntl()

  keyword ??= intl.formatMessage(messages.defaultKeyword)

  const handleTypedKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const typedKeyword = event.target.value
    setIsValidKeyword(typedKeyword.toUpperCase() === keyword?.toUpperCase())
  }

  const handleConfirmation = () => {
    if (isValidKeyword) {
      onConfirm()
      onClose()
    }
  }

  return (
    <>
      <Image src="/images/bud-danger.png" />

      <StyledAlertHeading>{intl.formatMessage(messages.dangerDialogTitle)}</StyledAlertHeading>
      <StyledAlertDescription>
        {intl.formatMessage(messages.dangerDialogDescription, { keyword, type })}
      </StyledAlertDescription>

      <Box w="full" pb={8}>
        <FormLabel>{intl.formatMessage(messages.dangerDialogInputLabel)}</FormLabel>
        <Input
          placeholder={intl.formatMessage(messages.dangerDialogPlaceholder, { keyword })}
          isInvalid={!isValidKeyword}
          color={isValidKeyword ? 'black.900' : 'red.500'}
          onChange={handleTypedKeywordChange}
        />
      </Box>

      <StyledAlertActionArea>
        <StyledAlertConfirmationButton isDisabled={!isValidKeyword} onClick={handleConfirmation}>
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
