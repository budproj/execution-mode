import { Box, Flex, FormLabel } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { MentionField } from 'src/components/Base/MentionField'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'

import messages from './messages'

const CheckInFormFieldCommentInput = () => {
  const intl = useIntl()
  const { values, setValues, handleSubmit } = useFormikContext<CheckInFormValues>()

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.inputLabel)}</FormLabel>
      <Flex direction="column" gridGap={4}>
        <MentionField values={values} setValues={setValues} handleSubmit={handleSubmit} />
      </Flex>
    </Box>
  )
}

CheckInFormFieldCommentInput.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldCommentInput
