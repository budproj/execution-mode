import { Input, InputGroup } from '@chakra-ui/input'
import { InputRightElement } from '@chakra-ui/react'
import { Field, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { CancelIcon } from '../../../Icon/Cancel/wrapper'

import { FormInputBase } from './base-input'
import messages from './messages'
import { FormValues } from './wrapper'

interface TitleInputProperties {
  hasValidationErrors?: boolean
}

export const TitleInput = ({ hasValidationErrors }: TitleInputProperties) => {
  const [hasBlurredInput, setHasBlurredInput] = useState(false)
  const [isFocused, setIsFocused] = useState(true)
  const intl = useIntl()
  const { values } = useFormikContext<FormValues>()

  const typedAnEmptyTitle = values.title.length === 0 && hasBlurredInput
  const isEmptyAfterValidation = values.title.length === 0 && hasValidationErrors
  const isInvalid = typedAnEmptyTitle || isEmptyAfterValidation

  const handleBlur = () => {
    if (!hasBlurredInput) setHasBlurredInput(true)
    if (isFocused) setIsFocused(false)
  }

  const handleFocus = () => {
    if (!isFocused) setIsFocused(true)
  }

  return (
    <FormInputBase title={intl.formatMessage(messages.firstInputLabel)}>
      <InputGroup onBlurCapture={handleBlur} onFocusCapture={handleFocus}>
        <Field
          name="title"
          as={Input}
          placeholder={intl.formatMessage(messages.firstInputPlaceholder)}
          isInvalid={isInvalid}
        />
        <InputRightElement
          h="full"
          opacity={isInvalid && !isFocused ? 1 : 0}
          transition="opacity .1s ease-in-out"
        >
          <CancelIcon fill="red.500" desc={intl.formatMessage(messages.invalidIconDesc)} />
        </InputRightElement>
      </InputGroup>
    </FormInputBase>
  )
}
