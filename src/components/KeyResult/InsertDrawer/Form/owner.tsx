import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultOwnerSelectMenu } from '../../OwnerSelectMenu/wrapper'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

export const OwnerInput = () => {
  const intl = useIntl()
  const { values } = useFormikContext<FormValues>()

  return (
    <FormInputBase title={intl.formatMessage(messages.sixthInputLabel)}>
      <KeyResultOwnerSelectMenu value={values.ownerId} />
    </FormInputBase>
  )
}
