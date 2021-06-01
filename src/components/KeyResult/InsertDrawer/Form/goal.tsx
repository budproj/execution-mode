import { Field } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { FormInputBase } from './base-input'
import { FormatMaskedInput } from './format-masked-input'
import messages from './messages'

export const GoalInput = () => {
  const intl = useIntl()

  return (
    <FormInputBase title={intl.formatMessage(messages.fifthInputLabel)}>
      <Field name="goal" as={FormatMaskedInput} />
    </FormInputBase>
  )
}
