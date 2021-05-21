import { Box, Flex, FormLabel, Textarea } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'

import messages from './messages'

const CheckInFormFieldCommentInput = () => {
  const intl = useIntl()
  const [value, setValue] = useState<string | undefined>()
  const { values, setFieldValue } = useFormikContext<CheckInFormValues>()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue('comment', event.target.value)
  }

  useEffect(() => {
    setValue(values?.comment)
  }, [values, setValue])

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.inputLabel)}</FormLabel>
      <Flex direction="column" gridGap={4}>
        <Textarea value={value} onChange={handleChange} onBlur={handleBlur} />
      </Flex>
    </Box>
  )
}

CheckInFormFieldCommentInput.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldCommentInput
