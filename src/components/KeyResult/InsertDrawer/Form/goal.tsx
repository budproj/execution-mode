import { Field, useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { selectMaskBasedOnFormat } from '../../NumberMasks/selectors'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

export const GoalInput = () => {
  const intl = useIntl()
  const { values } = useFormikContext<FormValues>()
  const { format } = values

  const Mask = selectMaskBasedOnFormat(format)

  return (
    <FormInputBase title={intl.formatMessage(messages.fifthInputLabel)}>
      <Field name="goal" as={Mask} />
    </FormInputBase>
  )
}
