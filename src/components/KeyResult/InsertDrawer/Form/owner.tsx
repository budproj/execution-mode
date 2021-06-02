import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultOwnerSelectMenu } from '../../OwnerSelectMenu/wrapper'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

export const OwnerInput = () => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const handleChange = (newOwnerID: string): void => {
    setFieldValue('ownerID', newOwnerID)
  }

  return (
    <FormInputBase title={intl.formatMessage(messages.sixthInputLabel)}>
      <KeyResultOwnerSelectMenu
        value={values.ownerID}
        avatarSubtitleType="role"
        placement="top"
        onChange={handleChange}
      />
    </FormInputBase>
  )
}
