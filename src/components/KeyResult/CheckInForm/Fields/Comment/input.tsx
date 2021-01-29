import { Box, Flex, FormLabel, Textarea } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'

import messages from './messages'

const CheckInFormFieldCommentInput = () => {
  const intl = useIntl()
  const { values, setFieldValue, isSubmitting } = useFormikContext<CheckInFormValues>()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue('comment', event.target.value)
  }

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.inputLabel)}</FormLabel>
      <Flex direction="column" gridGap={4}>
        <Textarea
          value={values.comment}
          isLoading={isSubmitting}
          InputComponent={Textarea}
          onChange={handleChange}
        />
      </Flex>
    </Box>
  )
}

CheckInFormFieldCommentInput.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldCommentInput
