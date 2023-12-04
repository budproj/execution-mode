import { Skeleton, Text } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { TASK_PRIORITY } from '../../types'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

interface FormatInputProperties {
  isLoading?: boolean
}

export const FormatInput = ({ isLoading }: FormatInputProperties) => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const handleChange = (newFormat: TASK_PRIORITY) => {
    setFieldValue('priority', newFormat)
  }

  return (
    <FormInputBase title={intl.formatMessage(messages.thirdInputLabel)}>
      <Skeleton isLoaded={!isLoading}>
        <Text>dsa</Text>
      </Skeleton>
    </FormInputBase>
  )
}
