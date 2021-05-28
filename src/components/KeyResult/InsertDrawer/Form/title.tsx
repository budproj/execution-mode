import { Input } from '@chakra-ui/input'
import { Field } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { FormInputBase } from './base-input'
import messages from './messages'

export const TitleInput = () => {
  const intl = useIntl()

  return (
    <FormInputBase title={intl.formatMessage(messages.firstInputLabel)}>
      <Field
        name="title"
        as={Input}
        placeholder={intl.formatMessage(messages.firstInputPlaceholder)}
      />
    </FormInputBase>
  )
}
