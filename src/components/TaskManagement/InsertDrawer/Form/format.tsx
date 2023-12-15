import { Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { FormInputBase } from './base-input'
import messages from './messages'

interface FormatInputProperties {
  isLoading?: boolean
}

export const FormatInput = ({ isLoading }: FormatInputProperties) => {
  const intl = useIntl()
  // Const { values, setFieldValue } = useFormikContext<FormValues>()

  // const handleChange = (newFormat: TASK_PRIORITY) => {
  //   setFieldValue('priority', newFormat)
  // }

  return (
    <FormInputBase title={intl.formatMessage(messages.thirdInputLabel)}>
      <Skeleton isLoaded={!isLoading}>
        <Text>dsa</Text>
      </Skeleton>
    </FormInputBase>
  )
}
