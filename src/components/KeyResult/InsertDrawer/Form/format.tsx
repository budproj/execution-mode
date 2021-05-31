import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultFormatSelectMenu } from '../../FormatSelectMenu/wrapper'

import { FormInputBase } from './base-input'
import messages from './messages'

export const FormatInput = () => {
  const intl = useIntl()

  return (
    <FormInputBase title={intl.formatMessage(messages.thirdInputLabel)}>
      <KeyResultFormatSelectMenu />
    </FormInputBase>
  )
}
