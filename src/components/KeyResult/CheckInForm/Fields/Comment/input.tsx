import { Box, FormLabel, Textarea } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { ChangeEvent, useCallback } from 'react'
import { useIntl } from 'react-intl'

import InputWithLoader from 'src/components/Base/InputWithLoader'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'

import messages from './messages'

export interface CheckInFormFieldCommentInputProperties {
  submitOnBlur: boolean
}

const CheckInFormFieldCommentInput = ({ submitOnBlur }: CheckInFormFieldCommentInputProperties) => {
  const intl = useIntl()
  const { values, setFieldValue, submitForm, isSubmitting } = useFormikContext<CheckInFormValues>()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('comment', event.target.value)
  }

  const handleBlur = useCallback(async () => {
    if (submitOnBlur) {
      await submitForm()
    }
  }, [submitOnBlur, submitForm])

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.inputLabel)}</FormLabel>
      <InputWithLoader
        value={values.comment}
        isLoading={isSubmitting}
        InputComponent={Textarea}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Box>
  )
}

CheckInFormFieldCommentInput.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldCommentInput
