import { Box, Button, Flex, FormLabel, Textarea } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

import InputWithLoader from 'src/components/Base/InputWithLoader'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'

import messages from './messages'

export interface CheckInFormFieldCommentInputProperties {
  submitOnBlur: boolean
}

const CheckInFormFieldCommentInput = ({ submitOnBlur }: CheckInFormFieldCommentInputProperties) => {
  const intl = useIntl()
  const { values, setFieldValue, isSubmitting } = useFormikContext<CheckInFormValues>()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('comment', event.target.value)
  }

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.inputLabel)}</FormLabel>
      <Flex direction="column" gridGap={4}>
        <InputWithLoader
          value={values.comment}
          isLoading={isSubmitting}
          InputComponent={Textarea}
          onChange={handleChange}
        />
        {submitOnBlur && (
          <Button
            variant="solid"
            type="submit"
            isLoading={isSubmitting}
            w="100%"
            _hover={{ bg: 'brand.600' }}
          >
            {intl.formatMessage(messages.submitButtonText)}
          </Button>
        )}
      </Flex>
    </Box>
  )
}

CheckInFormFieldCommentInput.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldCommentInput
