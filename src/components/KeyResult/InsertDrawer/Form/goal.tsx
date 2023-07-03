import { Skeleton } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { FormInputBase } from './base-input'
import { FormatMaskedInput } from './format-masked-input'
import messages from './messages'

interface GoalInputProperties {
  isLoading?: boolean
}

export const GoalInput = ({ isLoading }: GoalInputProperties) => {
  const intl = useIntl()

  return (
    <FormInputBase title={intl.formatMessage(messages.fifthInputLabel)}>
      <Skeleton isLoaded={!isLoading}>
        <Field name="goal" as={FormatMaskedInput} />
      </Skeleton>
    </FormInputBase>
  )
}
