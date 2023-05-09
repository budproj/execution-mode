import { Skeleton } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultFormatSelectMenu } from '../../FormatSelectMenu/wrapper'
import { KEY_RESULT_FORMAT } from '../../constants'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

interface FormatInputProperties {
  isLoading?: boolean
}

export const FormatInput = ({ isLoading }: FormatInputProperties) => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const currentValue = values.format
  const handleChange = (newFormat: KEY_RESULT_FORMAT) => {
    setFieldValue('format', newFormat)
  }

  return (
    <FormInputBase title={intl.formatMessage(messages.thirdInputLabel)}>
      <Skeleton isLoaded={!isLoading}>
        <KeyResultFormatSelectMenu value={currentValue} onChange={handleChange} />
      </Skeleton>
    </FormInputBase>
  )
}
