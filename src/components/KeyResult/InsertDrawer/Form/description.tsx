import { Skeleton, Textarea } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { FormInputBase } from './base-input'
import messages from './messages'

interface DescriptionInputProperties {
  isLoading?: boolean
}

export const DescriptionInput = ({ isLoading }: DescriptionInputProperties) => {
  const intl = useIntl()

  return (
    <FormInputBase>
      <Skeleton isLoaded={!isLoading}>
        <Field
          name="description"
          as={Textarea}
          whiteSpace="pre-line"
          placeholder={intl.formatMessage(messages.secondInputPlaceholder)}
          _placeholder={{ color: 'black.400' }}
          minH={28}
        />
      </Skeleton>
    </FormInputBase>
  )
}
