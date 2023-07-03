import { Skeleton } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { FormInputBase } from './base-input'
import { FormatMaskedInput } from './format-masked-input'
import messages from './messages'

interface InitialValueInputProperties {
  isLoading?: boolean
}

export const InitialValueInput = ({ isLoading }: InitialValueInputProperties) => {
  const intl = useIntl()

  return (
    <FormInputBase title={intl.formatMessage(messages.fourthInputLabel)}>
      <Skeleton isLoaded={!isLoading}>
        <Field name="initialValue" as={FormatMaskedInput} />
      </Skeleton>
    </FormInputBase>
  )
}
