import { Textarea } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { FormInputBase } from './base-input'
import messages from './messages'

export const DescriptionInput = () => {
  const intl = useIntl()

  return (
    <FormInputBase title={intl.formatMessage(messages.secondInputLabel)}>
      <Field
        name="description"
        as={Textarea}
        placeholder={intl.formatMessage(messages.secondInputPlaceholder)}
        minH={36}
      />
    </FormInputBase>
  )
}
